import {
  ManagedImage,
  type ManagedImageValue,
} from "@/components/sanity/managed-image";
import {
  getTeamMemberInitials,
  teamMembers,
  type TeamGlowPosition,
} from "@/constants/about-content";
import { cn } from "@/lib/cn";

const glowPositions: Record<TeamGlowPosition, string> = {
  "top-left": "-left-[50px] -top-[50px]",
  "top-right": "left-[50px] -top-[50px]",
  "high-left": "-left-[50px] -top-[100px]",
  "high-right": "left-[50px] -top-[100px]",
};

export function AboutTeamSection({
  decoration,
}: {
  decoration?: ManagedImageValue | null;
}) {
  return (
    <section
      aria-labelledby="about-team-heading"
      className="bg-[#eef2ff] px-6 py-16 text-midnight md:px-10 wide:h-[1875px] wide:p-20"
    >
      <div className="mx-auto w-full max-w-[1352px]">
        <div className="flex max-w-[900px] flex-col gap-2">
          <h2
            id="about-team-heading"
            className="font-display text-[36px] leading-10 font-semibold tracking-[-0.9px] md:text-5xl md:leading-12 md:tracking-[-1.2px]"
          >
            The team behind TRUX.
          </h2>
          <p className="max-w-[700px] pb-3 text-base leading-6 text-[#444441]">
            Operators, attorneys, and account leads who’ve built and scaled
            platforms in logistics, real estate, and trucking. They run TRUX day
            to day — and they pick up when you call.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 wide:mt-[72px] wide:grid-cols-4">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              aria-label={`${member.name} team member`}
              className="overflow-hidden rounded-[6px] border border-[#e5e5e5]/60 bg-white wide:h-[493px]"
            >
              <div className="relative flex h-60 items-center justify-center overflow-hidden bg-midnight bg-[linear-gradient(to_right,rgba(30,78,216,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,78,216,0.08)_1px,transparent_1px)] bg-[size:80px_60px]">
                <ManagedImage
                  value={decoration}
                  fallbackSrc="/assets/about-team-ellipse.svg"
                  fallbackAlt=""
                  decorative
                  width={400}
                  height={400}
                  className={cn(
                    "absolute size-[400px] max-w-none",
                    glowPositions[member.glow],
                  )}
                />
                <span className="relative font-display text-[80px] leading-[100px] font-[800] tracking-[-3px] text-white/95 wide:text-[96px]">
                  {getTeamMemberInitials(member.name)}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute top-5 left-5 h-[3px] w-13 bg-gradient-to-r from-amber via-amber/50 to-transparent"
                />
                {"board" in member && member.board ? (
                  <span className="absolute top-6 right-5 rounded-full border border-amber/40 bg-amber/15 px-2.5 py-[5px] text-[10px] leading-3 font-extrabold tracking-[1.2px] text-amber">
                    BOARD
                  </span>
                ) : null}
              </div>

              <div className="flex flex-col items-start gap-3 px-7 pt-7 pb-8">
                <h3 className="font-display text-[22px] leading-7 font-semibold tracking-[-0.5px]">
                  {member.name}
                </h3>
                <p className="text-[13px] leading-[18px] font-medium tracking-[0.3px] text-trux-blue">
                  {member.role}
                </p>
                <span aria-hidden="true" className="h-px w-8 bg-[#e5e5e5]" />
                <p className="text-sm leading-[22px] text-[#444441]">
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
