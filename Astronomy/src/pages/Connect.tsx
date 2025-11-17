import Card from "../components/Card";
import Container from "../components/Container";
import Button from "../components/Button";

export default function Connect() {
  return (
    <Container size="md" className="py-12 space-y-10">
      <div className="text-center">
        <h1 className="pb-4 text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-linear-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
          Get Involved
        </h1>
        <p className="text-lg text-indigo-200/80 max-w-2xl mx-auto">
          Join our stellar community and reach for the stars
        </p>
      </div>

      <Card variant="bordered" className="text-center">
        <h2 className="text-2xl font-bold mb-4 bg-linear-to-br from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          Become a Member
        </h2>
        <p className="text-indigo-100/90 mb-6 leading-relaxed">
          Membership is open to all Nease High School students interested in astronomy, space science, and cosmos learning. No prior experience required!
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button to="/about">Learn More</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="gradient">
          <h3 className="text-xl font-bold mb-3 bg-linear-to-br from-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Contact Us
          </h3>
          <p className="text-indigo-200/80 mb-2">
            Email: astronomy@nease.edu
          </p>
          <p className="text-indigo-200/80">
            Follow us on social media for updates and event announcements (add social media if we have)
          </p>
        </Card>

        <Card variant="gradient">
          <h3 className="text-xl font-bold mb-3 bg-linear-to-br from-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Support Our Mission
          </h3>
          <p className="text-indigo-200/80">
            We welcome sponsorships to enhance our equipment, fund possible field trips, and expand overall opportunities for our members.
          </p>
        </Card>
      </div>

      <Card className="text-center bg-linear-to-br from-indigo-500/20 to-purple-500/10">
        <div className="text-4xl mb-4">✨</div>
        <h3 className="text-2xl font-bold mb-3 bg-linear-to-br from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Interested in Sponsoring?
        </h3>
        <p className="text-indigo-100/90 mb-4 max-w-xl mx-auto">
          Help us inspire the next generation of astronomers. 
          Your support makes a lasting impact on the club's education and the club's community engagement.
        </p>
        <p className="text-indigo-300/80 text-sm">
          Contact us to learn about partnership opportunities
        </p>
      </Card>
    </Container>
  );
}
