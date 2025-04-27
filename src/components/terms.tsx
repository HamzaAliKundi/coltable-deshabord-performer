import React from 'react'

const Terms = () => {
  return (
    <div style={{
      backgroundImage: 'url(/home/bg.svg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="min-h-screen text-white p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h1 className="font-['Space_Grotesk'] text-[32px] md:text-[48px] font-bold text-center text-[#FF00A2] mb-8">
            Terms and Conditions
          </h1>
          <p className="font-['Space_Grotesk'] text-[14px] text-white/60 text-center mb-12">
            Last updated March 26, 2025
          </p>

          {/* Agreement Section */}
          <section className="mb-12">
            <h2 className="font-['Space_Grotesk'] text-[24px] md:text-[32px] font-bold text-[#FF00A2] mb-6">
              Agreement to Our Legal Terms
            </h2>
            <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
              <p className="text-white/90">
                We are DragSpace, LLC, doing business as DragSpace and DS ("Company," "we," "us," "our"), a company registered in Texas, United States at 2000 West Loop South, Suite 2200, Houston, TX 77027.
              </p>

              <p className="text-white/90">
                We operate the website https://www.dragspace.com (the "Site"), the mobile application __________ (the "App"), as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").
              </p>

              <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                <p className="text-white/90">You can contact us by:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2 text-white/90">
                  <li>Phone: <a href="tel:+18447133724" className="text-[#FF00A2] hover:underline">(+1)1-844-713-3724</a></li>
                  <li>Email: <a href="mailto:privacy@dragspace.com" className="text-[#FF00A2] hover:underline">privacy@dragspace.com</a></li>
                  <li>Mail: 2000 West Loop South, Suite 2200, Houston, TX 77027, United States</li>
                </ul>
              </div>

              <p className="text-white/90">
                These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and DragSpace, LLC, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
              </p>

              <p className="text-white/90">
                We will provide you with prior notice of any scheduled changes to the Services you are using. The modified Legal Terms will become effective upon posting or notifying you by privacy@dragspace.com, as stated in the email message. By continuing to use the Services after the effective date of any changes, you agree to be bound by the modified terms.
              </p>

              <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                <p className="text-white/90">
                  The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
                </p>
              </div>

              <p className="text-white/90 italic">
                We recommend that you print a copy of these Legal Terms for your records.
              </p>
            </div>
          </section>

          {/* Table of Contents */}
          <section className="mb-12">
            <h2 className="font-['Space_Grotesk'] text-[24px] md:text-[32px] font-bold text-[#FF00A2] mb-6">
              Table of Contents
            </h2>
            <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
              <ol className="list-decimal pl-6 space-y-2 text-white/90">
                {[
                  "OUR SERVICES",
                  "INTELLECTUAL PROPERTY RIGHTS",
                  "USER REPRESENTATIONS",
                  "USER REGISTRATION",
                  "PROHIBITED ACTIVITIES",
                  "USER GENERATED CONTRIBUTIONS",
                  "CONTRIBUTION LICENSE",
                  "GUIDELINES FOR REVIEWS",
                  "MOBILE APPLICATION LICENSE",
                  "SOCIAL MEDIA",
                  "THIRD-PARTY WEBSITES AND CONTENT",
                  "ADVERTISERS",
                  "SERVICES MANAGEMENT",
                  "PRIVACY POLICY",
                  "COPYRIGHT INFRINGEMENTS",
                  "TERM AND TERMINATION",
                  "MODIFICATIONS AND INTERRUPTIONS",
                  "GOVERNING LAW",
                  "DISPUTE RESOLUTION",
                  "CORRECTIONS",
                  "DISCLAIMER",
                  "LIMITATIONS OF LIABILITY",
                  "INDEMNIFICATION",
                  "USER DATA",
                  "ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES",
                  "SMS TEXT MESSAGING",
                  "CALIFORNIA USERS AND RESIDENTS",
                  "MISCELLANEOUS",
                  "CONTACT US"
                ].map((item, index) => (
                  <li key={index}>
                    <a href={`#section${index + 1}`} className="hover:text-[#FF00A2] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Content Sections */}
          <div className="mt-12 space-y-12">
            {/* Section 1: Our Services */}
            <section id="section1">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                1. Our Services
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                <p className="text-white/90">
                  The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
                </p>

                <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                  <p className="text-white/90">
                    The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Intellectual Property Rights */}
            <section id="section2">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                2. Intellectual Property Rights
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-8">
                {/* Our intellectual property */}
                <div className="space-y-4">
                  <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2]">
                    Our intellectual property
                  </h3>
                  <p className="text-white/90">
                    We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").
                  </p>
                  <p className="text-white/90">
                    Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.
                  </p>
                  <p className="text-white/90">
                    The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use or internal business purpose only.
                  </p>
                </div>

                {/* Your use of our Services */}
                <div className="space-y-4">
                  <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2]">
                    Your use of our Services
                  </h3>
                  <p className="text-white/90">
                    Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive, non-transferable, revocable license to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-white/90">
                    <li>access the Services; and</li>
                    <li>download or print a copy of any portion of the Content to which you have properly gained access,</li>
                  </ul>
                  <p className="text-white/90">solely for your personal, non-commercial use or internal business purpose.</p>
                </div>

                {/* Your submissions and contributions */}
                <div className="space-y-4">
                  <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2]">
                    Your submissions and contributions
                  </h3>
                  <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                    <p className="text-white/90 mb-4">
                      Please review this section and the "PROHIBITED ACTIVITIES" section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-['Space_Grotesk'] text-[14px] md:text-[16px] font-bold text-white">Submissions</h4>
                      <p className="text-white/90">
                        By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services ("Submissions"), you agree to assign to us all intellectual property rights in such Submission.
                      </p>
                      
                      <h4 className="font-['Space_Grotesk'] text-[14px] md:text-[16px] font-bold text-white">Contributions</h4>
                      <p className="text-white/90">
                        The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality during which you may create, submit, post, display, transmit, publish, distribute, or broadcast content and materials to us or through the Services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: User Representations */}
            <section id="section3">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                3. User Representations
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                <p className="text-white/90 mb-4">By using the Services, you represent and warrant that:</p>
                <ul className="list-disc pl-6 space-y-2 text-white/90">
                  <li>all registration information you submit will be true, accurate, current, and complete;</li>
                  <li>you will maintain the accuracy of such information and promptly update such registration information as necessary;</li>
                  <li>you have the legal capacity and you agree to comply with these Legal Terms;</li>
                  <li>you are not a minor in the jurisdiction in which you reside;</li>
                  <li>you will not access the Services through automated or non-human means, whether through a bot, script or otherwise;</li>
                  <li>you will not use the Services for any illegal or unauthorized purpose;</li>
                  <li>your use of the Services will not violate any applicable law or regulation.</li>
                </ul>
                
                <div className="mt-6 bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                  <p className="text-white/90">
                    If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: User Registration */}
            <section id="section4">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                4. User Registration
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                <p className="text-white/90">
                  You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
                </p>
              </div>
            </section>

            {/* Section 5: Prohibited Activities */}
            <section id="section5">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                5. Prohibited Activities
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                <p className="text-white/90">
                  You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                </p>

                <div className="space-y-4">
                  <p className="text-white/90">As a user of the Services, you agree not to:</p>
                  <ul className="list-disc pl-6 space-y-2 text-white/90">
                    <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                    <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                    <li>Circumvent, disable, or otherwise interfere with security-related features of the Services.</li>
                    <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
                    <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
                    <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                    <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
                    <li>Engage in unauthorized framing of or linking to the Services.</li>
                    <li>Upload or transmit viruses, Trojan horses, or other harmful material.</li>
                    <li>Engage in any automated use of the system.</li>
                    <li>Delete the copyright or other proprietary rights notice from any Content.</li>
                    <li>Attempt to impersonate another user or person.</li>
                    <li>Upload or transmit any passive or active information collection mechanisms.</li>
                    <li>Interfere with or disrupt the Services.</li>
                    <li>Harass, annoy, intimidate, or threaten our employees or agents.</li>
                    <li>Attempt to bypass any preventive measures.</li>
                    <li>Copy or adapt the Services' software.</li>
                    <li>Decipher, decompile, disassemble, or reverse engineer the Services.</li>
                    <li>Use automated systems to access the Services.</li>
                    <li>Use buying agents or purchasing agents.</li>
                    <li>Make unauthorized use of the Services.</li>
                    <li>Use the Services to compete with us.</li>
                    <li>Sell or transfer your profile.</li>
                    <li>Use the Services to advertise or sell goods and services.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6: User Generated Contributions */}
            <section id="section6">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                6. User Generated Contributions
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                <p className="text-white/90">
                  The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions").
                </p>

                <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                  <p className="text-white/90">
                    When you create or make available any Contributions, you thereby represent and warrant that:
                  </p>
                  <ul className="list-disc pl-6 mt-4 space-y-2 text-white/90">
                    <li>Your Contributions do not infringe on any third party's proprietary rights.</li>
                    <li>You have necessary rights, licenses, consents, and permissions.</li>
                    <li>You have permission to use the likeness of any identifiable individuals.</li>
                    <li>Your Contributions are not false, inaccurate, or misleading.</li>
                    <li>Your Contributions are not unsolicited advertising or solicitations.</li>
                    <li>Your Contributions are not obscene, lewd, or objectionable.</li>
                    <li>Your Contributions do not harass or threaten others.</li>
                    <li>Your Contributions do not violate any applicable laws.</li>
                    <li>Your Contributions do not violate privacy rights.</li>
                    <li>Your Contributions do not violate child protection laws.</li>
                    <li>Your Contributions do not include offensive discriminatory comments.</li>
                    <li>Your Contributions do not violate these Legal Terms.</li>
                  </ul>
                </div>

                <p className="text-white/90">
                  Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other things, termination or suspension of your rights to use the Services.
                </p>
              </div>
            </section>

            {/* Section 7: Contribution License */}
            <section id="section7">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                7. Contribution License
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                <p className="text-white/90">
                  By posting your Contributions to any part of the Services or making Contributions accessible to the Services by linking your account from the Services to any of your social networking accounts, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions.
                </p>

                <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                  <div className="space-y-4">
                    <p className="text-white/90">
                      This license will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide.
                    </p>
                    <p className="text-white/90">
                      You waive all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-white/90">
                    We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions.
                  </p>
                  <p className="text-white/90">
                    We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to re-categorize any Contributions to place them in more appropriate locations on the Services; and (3) to pre-screen or delete any Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8: Guidelines for Reviews */}
            <section id="section8">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                8. Guidelines for Reviews
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                <div className="space-y-4">
                  <p className="text-white/90">When posting a review, you must comply with the following criteria:</p>
                  <ul className="list-disc pl-6 space-y-2 text-white/90">
                    <li>you should have firsthand experience with the person/entity being reviewed;</li>
                    <li>your reviews should not contain offensive profanity, or abusive, racist, offensive, or hateful language;</li>
                    <li>your reviews should not contain discriminatory references;</li>
                    <li>your reviews should not contain references to illegal activity;</li>
                    <li>you should not be affiliated with competitors if posting negative reviews;</li>
                    <li>you should not make any conclusions as to the legality of conduct;</li>
                    <li>you may not post any false or misleading statements;</li>
                    <li>you may not organize a campaign encouraging others to post reviews.</li>
                  </ul>
                </div>

                <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                  <p className="text-white/90">
                    We may accept, reject, or remove reviews in our sole discretion. Reviews are not endorsed by us, and do not necessarily represent our opinions or the views of any of our affiliates or partners. By posting a review, you grant us a perpetual, non-exclusive, worldwide, royalty-free, fully paid, assignable, and sublicensable right and license to reproduce, modify, translate, transmit by any means, display, perform, and/or distribute all content relating to review.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 9: Mobile Application License */}
            <section id="section9">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                9. Mobile Application License
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-8">
                {/* Use License */}
                <div className="space-y-4">
                  <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2]">
                    Use License
                  </h3>
                  <p className="text-white/90">
                    If you access the Services via the App, we grant you a revocable, non-exclusive, non-transferable, limited right to install and use the App on wireless electronic devices owned or controlled by you.
                  </p>
                  <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                    <p className="text-white/90 mb-4">You shall not:</p>
                    <ul className="list-disc pl-6 space-y-2 text-white/90">
                      <li>decompile, reverse engineer, disassemble, or decrypt the App;</li>
                      <li>make any modification, adaptation, improvement, or derivative work;</li>
                      <li>violate any applicable laws;</li>
                      <li>remove or alter any proprietary notices;</li>
                      <li>use the App for any unauthorized commercial purpose;</li>
                      <li>make the App available over a network;</li>
                      <li>create competitive products;</li>
                      <li>send automated queries or unsolicited emails;</li>
                      <li>use our intellectual property in unauthorized ways.</li>
                    </ul>
                  </div>
                </div>

                {/* Apple and Android Devices */}
                <div className="space-y-4">
                  <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2]">
                    Apple and Android Devices
                  </h3>
                  <p className="text-white/90">
                    The following terms apply when you use the App obtained from either the Apple Store or Google Play:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-white/90">
                    <li>The license is limited to a non-transferable license for iOS or Android devices;</li>
                    <li>We are responsible for maintenance and support services;</li>
                    <li>App Distributors have limited warranty obligations;</li>
                    <li>You must comply with US export and restricted party regulations;</li>
                    <li>You must comply with third-party terms of agreement;</li>
                    <li>App Distributors are third-party beneficiaries of these terms.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 10: Social Media */}
            <section id="section10">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                10. Social Media
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                <p className="text-white/90">
                  You may link your account with Third-Party Accounts by either providing login information or granting us access to your Third-Party Account.
                </p>

                <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                  <p className="text-white/90 mb-4">By granting us access to Third-Party Accounts, you understand that:</p>
                  <ul className="list-disc pl-6 space-y-2 text-white/90">
                    <li>We may access and store your Social Network Content;</li>
                    <li>We may receive additional information from your Third-Party Account;</li>
                    <li>Social Network Content availability depends on Third-Party Account status;</li>
                    <li>You can disable connections between accounts at any time;</li>
                    <li>Your relationship with third-party providers is governed by your agreements with them;</li>
                    <li>We are not responsible for reviewing Social Network Content.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 11: Third-Party Websites and Content */}
            <section id="section11">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                11. Third-Party Websites and Content
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                <p className="text-white/90">
                  The Services may contain links to Third-Party Websites and Third-Party Content. Such content is not investigated, monitored, or checked for accuracy by us.
                </p>

                <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                  <p className="text-white/90 mb-4">Important notices:</p>
                  <ul className="list-disc pl-6 space-y-2 text-white/90">
                    <li>Inclusion does not imply our endorsement;</li>
                    <li>You access Third-Party Websites at your own risk;</li>
                    <li>These Legal Terms no longer govern when you leave our Services;</li>
                    <li>We are not responsible for third-party purchases;</li>
                    <li>We are not liable for harm from Third-Party Content or Websites.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 12: Advertisers */}
            <section id="section12">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                12. Advertisers
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                <p className="text-white/90">
                  We allow advertisers to display their advertisements and other information in certain areas of the Services, such as sidebar advertisements or banner advertisements. We simply provide the space to place such advertisements, and we have no other relationship with advertisers.
                </p>
              </div>
            </section>

            {/* Section 13: Services Management */}
            <section id="section13">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                13. Services Management
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                <p className="text-white/90">We reserve the right, but not the obligation, to:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-white/90">
                  <li>monitor the Services for violations of these Legal Terms;</li>
                  <li>take appropriate legal action against anyone who violates the law or these Legal Terms;</li>
                  <li>refuse, restrict access to, limit the availability of, or disable any of your Contributions;</li>
                  <li>remove or disable files and content that are excessive in size or burdensome to our systems;</li>
                  <li>manage the Services to protect our rights and property and facilitate proper functioning.</li>
                </ul>
              </div>
            </section>

            {/* Section 14: Privacy Policy */}
            <section id="section14">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                14. Privacy Policy
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                <p className="text-white/90">
                  We care about data privacy and security. By using the Services, you agree to be bound by our Privacy Policy posted on the Services, which is incorporated into these Legal Terms.
                </p>
                
                <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                  <p className="text-white/90">
                    Please be advised the Services are hosted in the United States. If you access the Services from any other region of the world with laws governing personal data collection that differ from applicable laws in the United States, then through your continued use of the Services, you are transferring your data to the United States, and you expressly consent to have your data transferred to and processed in the United States.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 15: Copyright Infringements */}
            <section id="section15">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                15. Copyright Infringements
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                <p className="text-white/90">
                  We respect the intellectual property rights of others. If you believe that any material available on or through the Services infringes upon any copyright you own or control, please immediately notify us using the contact information provided below (a "Notification").
                </p>
                
                <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                  <p className="text-white/90">
                    A copy of your Notification will be sent to the person who posted or stored the material addressed in the Notification. Please be advised that pursuant to applicable law you may be held liable for damages if you make material misrepresentations in a Notification. Thus, if you are not sure that material located on or linked to by the Services infringes your copyright, you should consider first contacting an attorney.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 16: Term and Termination */}
            <section id="section16">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                16. Term and Termination
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                <p className="text-white/90">
                  These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON.
                </p>

                <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                  <p className="text-white/90">
                    If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party.
                  </p>
                </div>

                <p className="text-white/90">
                  In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
                </p>
              </div>
            </section>

            {/* Section 17: Modifications and Interruptions */}
            <section id="section17">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                17. Modifications and Interruptions
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                <p className="text-white/90">
                  We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services.
                </p>

                <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                  <p className="text-white/90">
                    We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 18: Governing Law */}
            <section id="section18">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                18. Governing Law
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                <p className="text-white/90">
                  These Legal Terms and your use of the Services are governed by and construed in accordance with the laws of the State of Texas applicable to agreements made and to be entirely performed within the State of Texas, without regard to its conflict of law principles.
                </p>
              </div>
            </section>

            {/* Section 19: Dispute Resolution */}
            <section id="section19">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                19. Dispute Resolution
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-8">
                {/* Informal Negotiations */}
                <div className="space-y-4">
                  <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2]">
                    Informal Negotiations
                  </h3>
                  <p className="text-white/90">
                    To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms (each a "Dispute" and collectively, the "Disputes"), the Parties agree to first attempt to negotiate any Dispute informally for at least thirty (30) days before initiating arbitration.
                  </p>
                </div>

                {/* Binding Arbitration */}
                <div className="space-y-4">
                  <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2]">
                    Binding Arbitration
                  </h3>
                  <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                    <p className="text-white/90 mb-4">
                      If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute will be finally and exclusively resolved by binding arbitration. YOU UNDERSTAND THAT WITHOUT THIS PROVISION, YOU WOULD HAVE THE RIGHT TO SUE IN COURT AND HAVE A JURY TRIAL.
                    </p>
                    <p className="text-white/90">
                      The arbitration shall be conducted under the Commercial Arbitration Rules of the American Arbitration Association ("AAA") and the AAA's Supplementary Procedures for Consumer Related Disputes ("AAA Consumer Rules").
                    </p>
                  </div>
                </div>

                {/* Restrictions */}
                <div className="space-y-4">
                  <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2]">
                    Restrictions
                  </h3>
                  <p className="text-white/90">
                    The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-white/90">
                    <li>no arbitration shall be joined with any other proceeding;</li>
                    <li>there is no right for any Dispute to be arbitrated on a class-action basis;</li>
                    <li>there is no right for any Dispute to be brought in a purported representative capacity.</li>
                  </ul>
                </div>

                {/* Exceptions */}
                <div className="space-y-4">
                  <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2]">
                    Exceptions to Informal Negotiations and Arbitration
                  </h3>
                  <p className="text-white/90">
                    The Parties agree that the following Disputes are not subject to the above provisions concerning informal negotiations and binding arbitration:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-white/90">
                    <li>any Disputes seeking to enforce or protect intellectual property rights;</li>
                    <li>any Dispute related to allegations of theft, piracy, invasion of privacy, or unauthorized use;</li>
                    <li>any claim for injunctive relief.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 20: Corrections */}
            <section id="section20">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                20. Corrections
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                <p className="text-white/90">
                  There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
                </p>
              </div>
            </section>

            {/* Section 21: Disclaimer */}
            <section id="section21">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                21. Disclaimer
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                  <p className="text-white/90">
                    THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF.
                  </p>
                </div>

                <p className="text-white/90">We assume no liability or responsibility for:</p>
                <ul className="list-disc pl-6 space-y-2 text-white/90">
                  <li>Errors, mistakes, or inaccuracies of content and materials</li>
                  <li>Personal injury or property damage resulting from your access to and use of the Services</li>
                  <li>Unauthorized access to our secure servers and personal/financial information</li>
                  <li>Interruption or cessation of transmission to or from the Services</li>
                  <li>Bugs, viruses, trojan horses, or similar which may be transmitted to or through the Services</li>
                  <li>Errors or omissions in content or loss/damage incurred from use of content</li>
                </ul>
              </div>
            </section>

            {/* Section 22: Limitations of Liability */}
            <section id="section22">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                22. Limitations of Liability
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                  <p className="text-white/90">
                    IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES.
                  </p>
                </div>
                
                <p className="text-white/90">
                  Our liability to you for any cause whatsoever will be limited to the lesser of:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-white/90">
                  <li>The amount paid by you to us during the six (6) month period prior to any cause of action arising</li>
                  <li>$10,000.00 USD</li>
                </ul>
              </div>
            </section>

            {/* Section 23: Indemnification */}
            <section id="section23">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                23. Indemnification
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                <p className="text-white/90">
                  You agree to defend, indemnify, and hold us harmless from any claims arising out of:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-white/90">
                  <li>Your Contributions</li>
                  <li>Use of the Services</li>
                  <li>Breach of these Legal Terms</li>
                  <li>Breach of your representations and warranties</li>
                  <li>Violation of third-party rights</li>
                  <li>Harmful acts toward other users</li>
                </ul>
              </div>
            </section>

            {/* Section 24: User Data */}
            <section id="section24">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                24. User Data
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                <p className="text-white/90">
                  We will maintain certain data that you transmit to the Services for managing performance. Although we perform regular routine backups, you are solely responsible for all data that you transmit or that relates to your activities. You agree that we shall have no liability for any loss or corruption of such data.
                </p>
              </div>
            </section>

            {/* Section 25: Electronic Communications */}
            <section id="section25">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                25. Electronic Communications, Transactions, and Signatures
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                <p className="text-white/90">
                  Visiting the Services, sending emails, and completing online forms constitute electronic communications. You consent to receive electronic communications and agree that all agreements, notices, disclosures, and other communications we provide electronically satisfy any legal requirement for written communication.
                </p>
                
                <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                  <p className="text-white/90">
                    YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 26: SMS Text Messaging */}
            <section id="section26">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                26. SMS Text Messaging
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                <div className="space-y-4">
                  <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2]">
                    Opting Out
                  </h3>
                  <p className="text-white/90">
                    If at any time you wish to stop receiving SMS messages from us, simply reply to the text with "STOP." You may receive an SMS message confirming your opt out.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2]">
                    Message and Data Rates
                  </h3>
                  <p className="text-white/90">
                    Please be aware that message and data rates may apply to any SMS messages sent or received. The rates are determined by your carrier and the specifics of your mobile plan.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2]">
                    Support
                  </h3>
                  <p className="text-white/90">
                    If you have any questions or need assistance regarding our SMS communications, please email us at{' '}
                    <a href="mailto:privacy@dragspace.com" className="text-[#FF00A2] hover:underline">privacy@dragspace.com</a> or call at{' '}
                    <a href="tel:+18447133724" className="text-[#FF00A2] hover:underline">(+1)1-844-713-3724</a>.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 27: California Users and Residents */}
            <section id="section27">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                27. California Users and Residents
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                <p className="text-white/90">
                  If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
                </p>
              </div>
            </section>

            {/* Section 28: Miscellaneous */}
            <section id="section28">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                28. Miscellaneous
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                <p className="text-white/90">
                  These Legal Terms and any policies or operating rules posted by us constitute the entire agreement between you and us. Our failure to exercise any right or provision shall not constitute a waiver. These Legal Terms operate to the fullest extent permissible by law.
                </p>
                
                <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                  <p className="text-white/90">
                    There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 29: Contact Us */}
            <section id="section29">
              <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                29. Contact Us
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                <p className="text-white/90 mb-4">
                  In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
                </p>
                
                <div className="space-y-2 text-white/90">
                  <p>DragSpace, LLC</p>
                  <p>2000 West Loop South</p>
                  <p>Suite 2200</p>
                  <p>Houston, TX 77027</p>
                  <p>United States</p>
                  <p>Phone: <a href="tel:+18447133724" className="text-[#FF00A2] hover:underline">(+1)1-844-713-3724</a></p>
                  <p>Email: <a href="mailto:privacy@dragspace.com" className="text-[#FF00A2] hover:underline">privacy@dragspace.com</a></p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms
