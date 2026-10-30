import asyncio, os, sys, edge_tts
T = ["The Moon drifts about three point eight centimeters away from us every year.",
     "That's how fast your fingernails grow. Scientists bounce lasers off mirrors left on the Moon by Apollo astronauts.",
     "The Moon's gravity raises tides that act like a brake on Earth's spin. So our days slowly get longer.",
     "One point four billion years ago, a day on Earth lasted just eighteen hours. What would you skip in an eighteen-hour day?"]
rate = sys.argv[1] if len(sys.argv) > 1 else "+10%"
async def m():
    px = os.environ.get("HTTPS_PROXY")
    for i, t in enumerate(T):  # hook was regenerated at +20% to fit 4.3 s
        await edge_tts.Communicate(t, "en-US-AvaNeural", rate=rate, proxy=px).save(f"vo_en/vo_{i}.mp3")
asyncio.run(m())
