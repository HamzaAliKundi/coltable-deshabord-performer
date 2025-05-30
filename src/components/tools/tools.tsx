
const Tools = () => {
  return (
    <div className="p-4 min-h-[70vh] md:px-8 py-16 bg-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-[#FF00A2] text-3xl font-['Space_Grotesk'] mb-8">
          <u>
            <b>Profile Posting Guidelines</b>
          </u>
        </h1>

        <div className="text-white font-['Space_Grotesk'] mb-8">
          <p className="text-lg mb-6">
            Let's keep this space fierce, fun, and family-friendly. These guidelines ensure that everyone — including our younger fans — can enjoy the magic of drag and performance artistry in a respectful, empowering, and welcoming environment.
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              title: "Keep It Cute — And Clean",
              content: "No vulgar language, slurs, or hate speech. This is a stage, not a shouting match. Keep your captions and comments polished and positive."
            },
            {
              title: "PG, Please!",
              content: "No nudity, sexually explicit content, or indecent exposure. This isn't Untucked, and yes, the children are watching — literally!"
            },
            {
              title: "All Ages Welcome",
              content: "Remember: profiles are accessible to youth and families. Represent the art of drag in a way that inspires and uplifts across generations."
            },
            {
              title: "Respect is Always in Fashion",
              content: "Treat fellow performers and fans with kindness and dignity. No bullying, harassment, or shade that crosses the line."
            },
            {
              title: "Be Your Best Self",
              content: "Show the world your talent, creativity, and heart. This is your stage — honor the legacy of those who trailblazed this path before you by putting your best heel forward."
            },
            {
              title: "Let Your Looks Speak Louder",
              content: "Flash photography is encouraged for high-quality photos that elevate your profile and visibility. That said, we do not allow selfies—let your artistry shine through professional or performance shots."
            },
            {
              title: "No Submissions for Adult Services",
              content: "This isn't the place for solicitations of any kind. Keep the focus on your performances and fans, not your OnlyFans."
            },
            {
              title: "Mind the Music & Memes",
              content: "Content with suggestive lyrics or innuendos? Keep it subtle, clever, and suitable for a general audience."
            },
            {
              title: "Costumes, Not Controversy",
              content: "Share your looks, lewks, and illusions — but avoid content that could be seen as offensive or inappropriate for minors."
            },
            {
              title: "No Drugs, No Drama",
              content: "Don't glamorize drug use, excessive drinking, or illegal activities. This is about artistry, not after-hours antics."
            },
            {
              title: "Be the Role Model You Needed",
              content: "Whether you're new to the scene or a legend in the making, remember: someone is watching, learning, and dreaming because of you. Represent with pride."
            },
            {
              title: "Keep the Focus on the Art",
              content: "This is a platform for performance, passion, and personality. Save personal drama, callouts, and cryptic shade for your diary — not your profile."
            },
            {
              title: "Celebrate, Don't Appropriate",
              content: "Drag is built on culture, resilience, and rebellion. Be mindful of how you represent identities, traditions, and communities. Honor the diversity that makes drag powerful."
            }
          ].map((guideline, index) => (
            <div key={index} className="bg-[#212121] p-6 rounded-[8px]">
              <h3 className="text-[#FF00A2] text-xl font-bold mb-3">{index + 1}. {guideline.title}</h3>
              <p className="text-white">{guideline.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#212121] p-6 rounded-[8px]">
          <h2 className="text-[#FF00A2] text-2xl font-bold mb-4">One Other Requirement for Profile Approval</h2>
          <h3 className="text-[#FF00A2] text-xl font-bold mb-3">Booked & Beautiful</h3>
          <p className="text-white">
            Your profile must reflect that you've had at least one paid booking at a venue (bar, club, event, etc.). This helps ensure all profiles represent active and experienced performers.
          </p>
        </div>

        <div className="mt-12 bg-[#212121] p-6 rounded-[8px]">
          <h2 className="text-[#FF00A2] text-2xl font-bold mb-4">Your Presence on DragSpace is More Than a Profile</h2>
          <p className="text-white">
            As a drag performer, your presence — both online and onstage — is more than just a look; it's a legacy. Your content reflects not only on you but on the entire drag community. Be mindful, intentional, and respectful. Young eyes are watching, elders are proud, and your performances will be remembered. Leave behind a legacy worth living up to — one that uplifts, empowers, and embodies the spirit of drag at its finest.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Tools