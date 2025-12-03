import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { UsersIcon, MailIcon, StarIcon, SparklesIcon } from "../components/ui/Icons";

export default function Connect() {
  return (
    <Container size="lg" className="py-12 space-y-16">
      {/* Hero Section */}
      <div className="relative text-center mb-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
        
        <h1 className="pb-4 text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-linear-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
          Get Involved
        </h1>
        <p className="text-xl text-indigo-200/80 max-w-2xl mx-auto font-light tracking-wide">
          Join our stellar community and reach for the stars.
        </p>
      </div>

      <Card variant="bordered" className="text-center p-10 bg-linear-to-b from-indigo-950/50 to-transparent border-indigo-500/30">
        <div className="flex justify-center mb-6">
          <UsersIcon className="w-20 h-20 text-indigo-300 animate-bounce" />
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-linear-to-br from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          Become a Member
        </h2>
        <p className="text-lg text-indigo-100/90 mb-8 leading-relaxed max-w-3xl mx-auto">
          Membership is open to all Nease High School students interested in astronomy, space science, and cosmos learning. 
          No prior experience required! Just show up to our next meeting.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button to="/about">See Meeting Times</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card variant="gradient" className="h-full transform hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <MailIcon className="w-6 h-6 text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold bg-linear-to-br from-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Contact Us
            </h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/10">
              <p className="text-sm text-indigo-300/60 mb-1">General Inquiries</p>
              <a href="mailto:astronomy@nease.edu" className="text-lg text-indigo-100 hover:text-pink-300 transition-colors">
                astronomy@nease.edu
              </a>
            </div>
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/10">
              <p className="text-sm text-indigo-300/60 mb-1">Social Media</p>
              <p className="text-indigo-200/80">
                [Random Social media]
                <br/>
                <span className="text-pink-400">@NeaseAstronomy</span>
              </p>
            </div>
          </div>
        </Card>

        <Card variant="gradient" className="h-full transform hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
              <StarIcon className="w-6 h-6 text-pink-300" />
            </div>
            <h3 className="text-2xl font-bold bg-linear-to-br from-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Support Our Mission
            </h3>
          </div>
          <p className="text-indigo-200/80 mb-6 leading-relaxed">
            We welcome sponsorships to enhance our equipment, fund field trips, and expand opportunities for our members.
            Your support makes a difference!
          </p>
          <Button to="/sponsors" variant="outline" className="w-full justify-center">
            View Sponsorship Opportunities
          </Button>
        </Card>
      </div>

      <div className="relative rounded-3xl overflow-hidden p-12 text-center border border-indigo-500/30 bg-linear-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-md">
        <div className="absolute inset-0 bg-indigo-500/5 blur-3xl -z-10" />
        <div className="flex justify-center mb-6">
          <SparklesIcon className="w-16 h-16 text-yellow-200" />
        </div>
        <h3 className="text-3xl font-bold mb-4 bg-linear-to-br from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Ready to Join?
        </h3>
        <p className="text-lg text-indigo-100/90 mb-8 max-w-2xl mx-auto">
          Whether you want to learn about black holes, build a rocket, or just hang out with cool people, 
          Nease Astronomy Club is the place for you.
        </p>
        <p className="text-indigo-300/80 text-sm">
          See you at our next meeting!
        </p>
      </div>
    </Container>
  );
}
