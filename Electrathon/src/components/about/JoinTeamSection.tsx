import Button from "../ui/Button";
import SectionHeader from "../ui/SectionHeader";
import clubFormPDF from "../../assets/Electrathon Sponsorship info sheet.pdf";
export default function JoinTeamSection() {
  return (
    <div className="mt-24 relative border-t border-[#d4af37]/20 pt-16">
      <div className="text-center">
        <SectionHeader
          title="Join the Team"
          subtitle="BECOME A MEMBER"
          className="mb-8"
        />

        <div className="text-lg text-white/70 max-w-3xl mx-auto mb-12 font-light gap-5 flex flex-col items-center">
          <p>
            We meet every week after school to build the car, practice skills, and get ready for races. Whether you like welding, coding, driving, or helping keep the team organized, there’s a place for you.
          </p>
          <p>
            No experience is required—just bring curiosity and a willingness to learn.
          </p>
          <Button
            href={clubFormPDF}
            download="Electrathon Club Interest Form.pdf"
            className="bg-[#d4af37] text-black font-bold hover:bg-white w-full md:w-auto text-center"
          >
            Download Interest Form (PDF)
          </Button>
        </div>

        <div className="inline-flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 border border-[#d4af37]/30 bg-[#0a2a20]/50 p-8 md:px-16 clip-corner-br">
          <div className="text-center md:text-left">
            <p className="text-[#d4af37] font-bold text-sm uppercase tracking-widest mb-1">
              Meeting Times
            </p>
            <p className="text-white font-mono text-2xl">Thursdays 4-5PM</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-[#d4af37]/30"></div>
          <div className="text-center md:text-left">
            <p className="text-[#d4af37] font-bold text-sm uppercase tracking-widest mb-1">
              Location
            </p>
            <p className="text-white font-mono text-xl">Panther Hall 220</p>
          </div>
        </div>
      </div>
    </div>
  );
}
