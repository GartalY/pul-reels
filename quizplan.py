"""Plan and render the 5 daily quiz stories for @bilirdinizmi_az.

python3 quizplan.py YYYY-MM-DD [--seed N]

- Quizzes on today's 3 posts (each post's first unused question) + 2 "recall" quizzes picked at random from
  facts/db.json (older posts, least recently quizzed first), so old posts keep getting attention.
- Time order: 11:00 recall · 14:00 post 1 · 16:30 recall · 19:30 post 2 · 22:30 post 3
  (each post-quiz is ~1 hour after its post: posts are 13:00, 18:30, 21:30).
- Each quiz is TWO images posted together from one Metricool notification: qN.jpg (question, Gartal adds
  the Poll sticker) and qN_a.jpg (answer + explanation) — viewers tap once to see the answer.
- Writes "stories" into facts/<date>.json, adds today's facts to facts/db.json, renders out/<date>/qN.jpg.
"""
import json, os, random, subprocess, sys
from datetime import date, timedelta

ROOT = os.path.dirname(os.path.abspath(__file__))
SLOTS = [("11:00", "recall"), ("14:00", 0), ("16:30", "recall"), ("19:30", 1), ("22:30", 2)]

def load(p, default=None):
    p = os.path.join(ROOT, p)
    return json.load(open(p)) if os.path.exists(p) else default

def save(p, obj):
    json.dump(obj, open(os.path.join(ROOT, p), "w"), ensure_ascii=False, indent=1)

def main():
    D = sys.argv[1]
    seed = int(sys.argv[sys.argv.index("--seed") + 1]) if "--seed" in sys.argv else int(D.replace("-", ""))
    rnd = random.Random(seed)
    day = load(f"facts/{D}.json")
    db = load("facts/db.json", {"facts": []})
    by_id = {f["id"]: f for f in db["facts"]}
    for e in db["facts"]:                 # re-running a day is safe: forget that day's previous picks
        e["asked"] = [a for a in e["asked"] if a["date"] != D]

    # 1) make sure today's facts are in the database
    for f in day["facts"]:
        fid = f"{D}-{f['n']}"
        if fid not in by_id:
            e = {"id": fid, "date": D, "subject": f["subject"], "cat": f.get("cat", "Fakt"),
                 "quizzes": f["quizzes"], "asked": []}
            db["facts"].append(e); by_id[fid] = e

    # 2) pick questions
    def next_q(e):
        used = {a["qi"] for a in e["asked"]}
        free = [i for i in range(len(e["quizzes"])) if i not in used]
        return (free or list(range(len(e["quizzes"]))))[0]

    older = [e for e in db["facts"] if e["date"] < D]
    def last_asked(e): return max([a["date"] for a in e["asked"]] or ["0000"])
    rnd.shuffle(older)
    older.sort(key=last_asked)            # least recently quizzed first (shuffle breaks ties randomly)
    recall_pool = older[:2]
    if len(recall_pool) < 2:              # not enough history yet: fall back to today's posts' 2nd questions
        recall_pool += [by_id[f"{D}-{f['n']}"] for f in day["facts"]][: 2 - len(recall_pool)]

    stories, ri = [], 0
    for t, src in SLOTS:
        e = recall_pool[ri] if src == "recall" else by_id[f"{D}-{day['facts'][src]['n']}"]
        if src == "recall": ri += 1
        qi = next_q(e)
        if src == "recall" and e["date"] == D:  # fallback case: use a different question than the post quiz
            qi = 1 if len(e["quizzes"]) > 1 else 0
        q = e["quizzes"][qi]
        e["asked"].append({"date": D, "qi": qi})
        stories.append({"time": t, "fact_id": e["id"], "recall": src == "recall", "cat": e["cat"],
                        "q": q["q"], "options": q["options"], "answer": q["answer"], "why": q.get("why", "")})

    # 3) previous-answer chain
    prev_day = (date.fromisoformat(D) - timedelta(days=1)).isoformat()
    pd = load(f"facts/{prev_day}.json", {})
    prev = None
    if pd.get("stories"):
        s = pd["stories"][-1]; prev = {"q": s["q"], "a": s["answer"]}
    elif pd.get("facts"):  # old format day: its last poll was about the last fact
        f = pd["facts"][-1]; q = f.get("quiz") or f["quizzes"][0]
        prev = {"q": q["q"], "a": q["answer"]}

    os.makedirs(os.path.join(ROOT, f"out/{D}"), exist_ok=True)
    for i, s in enumerate(stories, 1):
        cfg = {"n": f"{i}/5", "cat": s["cat"], "q": s["q"], "prev": None, "recall": s["recall"]}
        out = f"out/{D}/q{i}.jpg"; outa = f"out/{D}/q{i}_a.jpg"
        subprocess.run([sys.executable, os.path.join(ROOT, "factgen.py"), "quizstory", "none",
                        os.path.join(ROOT, out), json.dumps(cfg, ensure_ascii=False)], check=True)
        acfg = {"n": f"{i}/5", "cat": s["cat"], "q": s["q"], "a": s["answer"], "why": s["why"]}
        subprocess.run([sys.executable, os.path.join(ROOT, "factgen.py"), "answerstory", "none",
                        os.path.join(ROOT, outa), json.dumps(acfg, ensure_ascii=False)], check=True)
        s["image"] = out; s["answer_image"] = outa

    day["stories"] = stories
    save(f"facts/{D}.json", day); save("facts/db.json", db)
    for i, s in enumerate(stories, 1):
        print(f"{s['time']}  q{i}  {'recall ' if s['recall'] else ''}{s['q']}  [{' · '.join(s['options'])}]  ✓ {s['answer']}")

if __name__ == "__main__":
    main()
