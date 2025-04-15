import React from 'react';

const Privacy = () => {
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
            Privacy Policy
          </h1>
          <p className="font-['Space_Grotesk'] text-[14px] text-white/60 text-center mb-12">
            Last updated March 26, 2025
          </p>

          {/* Introduction */}
          <div className="space-y-6">
            <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
              This Privacy Notice for DragSpace, LLC (doing business as DragSpace) ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:
            </p>

            <ul className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90 list-disc pl-6 space-y-2">
              <li>Visit our website at https://www.dragspace.com, or any website of ours that links to this Privacy Notice</li>
              <li>Download and use our mobile application (DragSpace), or any other application of ours that links to this Privacy Notice</li>
              <li>Use DragSpace.com. A social media platform dedicated to celebrating, showcasing, and amplifying the incredible artistry of drag performers.</li>
              <li>Engage with us in other related ways, including any sales, marketing, or events</li>
            </ul>

            <div className="bg-[#1D1D1D]/50 p-6 rounded-lg border border-[#FF00A2]/20">
              <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at{' '}
                <a href="mailto:privacy@dragspace.com" className="text-[#FF00A2] hover:underline">privacy@dragspace.com</a>.
              </p>
            </div>

            {/* Summary Section */}
            <div className="mt-12">
              <h2 className="font-['Space_Grotesk'] text-[24px] md:text-[32px] font-bold text-[#FF00A2] mb-6">
                Summary of Key Points
              </h2>
              <div className="space-y-4">
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                  <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-white mb-2">
                    Personal Information Collection
                  </h3>
                  <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                    We collect personal information that you voluntarily provide when interacting with our Services.
                  </p>
                </div>

                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                  <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-white mb-2">
                    Sensitive Information
                  </h3>
                  <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                    We do not process sensitive information.
                  </p>
                </div>

                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                  <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-white mb-2">
                    Information Usage
                  </h3>
                  <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                    We process your information to provide, improve, and administer our Services, for security, and to comply with law.
                  </p>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="mt-12">
              <h2 className="font-['Space_Grotesk'] text-[24px] md:text-[32px] font-bold text-[#FF00A2] mb-6">
                Table of Contents
              </h2>
              <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                <ol className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90 list-decimal pl-6 space-y-2">
                  <li><a href="#section1" className="hover:text-[#FF00A2] transition-colors">What Information Do We Collect?</a></li>
                  <li><a href="#section2" className="hover:text-[#FF00A2] transition-colors">How Do We Process Your Information?</a></li>
                  <li><a href="#section3" className="hover:text-[#FF00A2] transition-colors">What Legal Bases Do We Rely On?</a></li>
                  <li><a href="#section4" className="hover:text-[#FF00A2] transition-colors">When And With Whom Do We Share Your Information?</a></li>
                  <li><a href="#section5" className="hover:text-[#FF00A2] transition-colors">What Is Our Stance On Third-Party Websites?</a></li>
                  <li><a href="#section6" className="hover:text-[#FF00A2] transition-colors">Do We Use Cookies And Other Tracking Technologies?</a></li>
                  <li><a href="#section7" className="hover:text-[#FF00A2] transition-colors">How Do We Handle Your Social Logins?</a></li>
                  <li><a href="#section8" className="hover:text-[#FF00A2] transition-colors">How Long Do We Keep Your Information?</a></li>
                  <li><a href="#section9" className="hover:text-[#FF00A2] transition-colors">How Do We Keep Your Information Safe?</a></li>
                  <li><a href="#section10" className="hover:text-[#FF00A2] transition-colors">Do We Collect Information From Minors?</a></li>
                  <li><a href="#section11" className="hover:text-[#FF00A2] transition-colors">What Are Your Privacy Rights?</a></li>
                  <li><a href="#section12" className="hover:text-[#FF00A2] transition-colors">Controls For Do-Not-Track Features</a></li>
                  <li><a href="#section13" className="hover:text-[#FF00A2] transition-colors">Do United States Residents Have Specific Privacy Rights?</a></li>
                  <li><a href="#section14" className="hover:text-[#FF00A2] transition-colors">Do Other Regions Have Specific Privacy Rights?</a></li>
                  <li><a href="#section15" className="hover:text-[#FF00A2] transition-colors">Do We Make Updates To This Notice?</a></li>
                  <li><a href="#section16" className="hover:text-[#FF00A2] transition-colors">How Can You Contact Us About This Notice?</a></li>
                  <li><a href="#section17" className="hover:text-[#FF00A2] transition-colors">How Can You Review, Update, Or Delete Your Data?</a></li>
                </ol>
              </div>
            </div>

            {/* Content Sections */}
            <div className="mt-12 space-y-12">
              {/* Section 1 */}
              <section id="section1">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  1. What Information Do We Collect?
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-white mb-2">
                      Personal information you disclose to us
                    </h3>
                    <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90 italic mb-4">
                      In Short: We collect personal information that you provide to us.
                    </p>
                    <p className="text-white/90 mb-4">
                      We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-['Space_Grotesk'] text-[14px] md:text-[16px] font-bold text-[#FF00A2]">
                        Personal Information Provided by You
                      </h4>
                      <p className="text-white/90">The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
                      <ul className="list-disc pl-6 space-y-2 text-white/90">
                        <li>names</li>
                        <li>phone numbers</li>
                        <li>email addresses</li>
                        <li>usernames</li>
                        <li>passwords</li>
                        <li>contact preferences</li>
                        <li>contact or authentication data</li>
                      </ul>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-['Space_Grotesk'] text-[14px] md:text-[16px] font-bold text-[#FF00A2] mb-2">
                        Sensitive Information
                      </h4>
                      <p className="text-white/90">We do not process sensitive information.</p>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-['Space_Grotesk'] text-[14px] md:text-[16px] font-bold text-[#FF00A2] mb-2">
                        Application Data
                      </h4>
                      <p className="text-white/90 mb-4">If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:</p>
                      <ul className="list-disc pl-6 space-y-2 text-white/90">
                        <li>
                          <span className="font-bold">Geolocation Information.</span> We may request access or permission to track location-based information from your mobile device, either continuously or while you are using our mobile application(s), to provide certain location-based services. If you wish to change our access or permissions, you may do so in your device's settings.
                        </li>
                        <li>
                          <span className="font-bold">Mobile Device Access.</span> We may request access or permission to certain features from your mobile device, including your mobile device's calendar, and other features. If you wish to change our access or permissions, you may do so in your device's settings.
                        </li>
                        <li>
                          <span className="font-bold">Push Notifications.</span> We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device's settings.
                        </li>
                      </ul>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-['Space_Grotesk'] text-[14px] md:text-[16px] font-bold text-[#FF00A2] mb-2">
                        Information automatically collected
                      </h4>
                      <p className="text-white/90 italic mb-4">
                        In Short: Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.
                      </p>
                      <p className="text-white/90 mb-4">
                        We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
                      </p>
                      <div className="space-y-4">
                        <p className="text-white/90">The information we collect includes:</p>
                        <ul className="list-disc pl-6 space-y-4 text-white/90">
                          <li>
                            <span className="font-bold">Log and Usage Data.</span> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files.
                          </li>
                          <li>
                            <span className="font-bold">Location Data.</span> We collect location data such as information about your device's location, which can be either precise or imprecise.
                          </li>
                          <li>
                            <span className="font-bold">Google API.</span> Our use of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section id="section2">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  2. How Do We Process Your Information?
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                  <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90 italic mb-4">
                    In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
                  </p>
                  <ul className="list-disc pl-6 space-y-3 text-white/90">
                    <li>To facilitate account creation and authentication and otherwise manage user accounts.</li>
                    <li>To request feedback.</li>
                    <li>To send you marketing and promotional communications.</li>
                    <li>To deliver targeted advertising to you.</li>
                    <li>To protect our Services.</li>
                    <li>To identify usage trends.</li>
                    <li>To determine the effectiveness of our marketing and promotional campaigns.</li>
                    <li>To save or protect an individual's vital interest.</li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section id="section3">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  3. What Legal Bases Do We Rely On To Process Your Information?
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                  <p className="text-white/90 italic">
                    In Short: We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2] mb-2">
                        If you are located in the EU or UK, this section applies to you.
                      </h3>
                      <p className="text-white/90 mb-4">
                        The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:
                      </p>
                      <ul className="list-disc pl-6 space-y-4 text-white/90">
                        <li>
                          <span className="font-bold">Consent.</span> We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose.
                        </li>
                        <li>
                          <span className="font-bold">Legitimate Interests.</span> We may process your information when we believe it is reasonably necessary to achieve our legitimate business interests.
                        </li>
                        <li>
                          <span className="font-bold">Legal Obligations.</span> We may process your information where we believe it is necessary for compliance with our legal obligations.
                        </li>
                        <li>
                          <span className="font-bold">Vital Interests.</span> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2] mb-2">
                        If you are located in Canada, this section applies to you.
                      </h3>
                      <p className="text-white/90 mb-4">
                        We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.
                      </p>
                      <p className="text-white/90">In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:</p>
                      <ul className="list-disc pl-6 space-y-2 text-white/90">
                        <li>If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
                        <li>For investigations and fraud detection and prevention</li>
                        <li>For business transactions provided certain conditions are met</li>
                        <li>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
                        <li>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
                        <li>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
                        <li>If it was produced by an individual in the course of their employment, business, or profession</li>
                        <li>If the collection is solely for journalistic, artistic, or literary purposes</li>
                        <li>If the information is publicly available and is specified by the regulations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section id="section4">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  4. When And With Whom Do We Share Your Personal Information?
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                  <p className="text-white/90 italic mb-4">
                    In Short: We may share information in specific situations described in this section and/or with the following third parties.
                  </p>
                  
                  <p className="text-white/90 mb-4">We may need to share your personal information in the following situations:</p>
                  
                  <ul className="list-disc pl-6 space-y-3 text-white/90">
                    <li>
                      <span className="font-bold">Business Transfers.</span> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                    </li>
                    <li>
                      <span className="font-bold">When we use Google Maps Platform APIs.</span> We may share your information with certain Google Maps Platform APIs (e.g., Google Maps API, Places API).
                    </li>
                    <li>
                      <span className="font-bold">Affiliates.</span> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Notice.
                    </li>
                    <li>
                      <span className="font-bold">Business Partners.</span> We may share your information with our business partners to offer you certain products, services, or promotions.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section id="section5">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  5. What Is Our Stance On Third-Party Websites?
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                  <p className="text-white/90 italic mb-4">
                    In Short: We are not responsible for the safety of any information that you share with third parties that we may link to or who advertise on our Services, but are not affiliated with, our Services.
                  </p>
                  
                  <p className="text-white/90">
                    The Services may link to third-party websites, online services, or mobile applications and/or contain advertisements from third parties that are not affiliated with us and which may link to other websites, services, or applications. Accordingly, we do not make any guarantee regarding any such third parties, and we will not be liable for any loss or damage caused by the use of such third-party websites, services, or applications. The inclusion of a link towards a third-party website, service, or application does not imply an endorsement by us. We cannot guarantee the safety and privacy of data you provide to any third parties. Any data collected by third parties is not covered by this Privacy Notice. We are not responsible for the content or privacy and security practices and policies of any third parties, including other websites, services, or applications that may be linked to or from the Services. You should review the policies of such third parties and contact them directly to respond to your questions.
                  </p>
                </div>
              </section>

              {/* Section 6: Cookies (continued) */}
              <section id="section6">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  6. Do We Use Cookies And Other Tracking Technologies?
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                  <p className="text-white/90 italic mb-4">
                    In Short: We may use cookies and other tracking technologies to collect and store your information.
                  </p>
                  
                  <div className="space-y-4">
                    <p className="text-white/90">
                      We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
                    </p>

                    <p className="text-white/90">
                      We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.
                    </p>

                    <p className="text-white/90">
                      To the extent these online tracking technologies are deemed to be a "sale"/"sharing" (which includes targeted advertising, as defined under the applicable laws) under applicable US state laws, you can opt out of these online tracking technologies by submitting a request as described below under section "DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?"
                    </p>

                    <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                      <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2] mb-2">
                        Google Analytics
                      </h3>
                      <p className="text-white/90">
                        We may share your information with Google Analytics to track and analyze the use of the Services. The Google Analytics Advertising Features that we may use include: Remarketing with Google Analytics. To opt out of being tracked by Google Analytics across the Services, visit https://tools.google.com/dlpage/gaoptout. You can opt out of Google Analytics Advertising Features through Ads Settings and Ad Settings for mobile apps. Other opt out means include http://optout.networkadvertising.org/ and http://www.networkadvertising.org/mobile-choice. For more information on the privacy practices of Google, please visit the Google Privacy & Terms page.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7: Social Logins */}
              <section id="section7">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  7. How Do We Handle Your Social Logins?
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                  <p className="text-white/90 italic mb-4">
                    In Short: If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.
                  </p>
                  
                  <div className="space-y-4">
                    <p className="text-white/90">
                      Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.
                    </p>

                    <p className="text-white/90">
                      We will use the information we receive only for the purposes that are described in this Privacy Notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.
                    </p>
                  </div>
                </div>
              </section>

              {/* Information Automatically Collected Section */}
              <section className="mt-12">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  Information automatically collected
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                  <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90 italic">
                    In Short: Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.
                  </p>

                  <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                    We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
                  </p>

                  <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                    Like many businesses, we also collect information through cookies and similar technologies.
                  </p>

                  <div className="space-y-4">
                    <p className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-white">
                      The information we collect includes:
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-['Space_Grotesk'] text-[14px] md:text-[16px] font-bold text-[#FF00A2]">
                          Log and Usage Data
                        </h3>
                        <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                          Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called "crash dumps"), and hardware settings).
                        </p>
                      </div>
                      <div>
                        <h3 className="font-['Space_Grotesk'] text-[14px] md:text-[16px] font-bold text-[#FF00A2]">
                          Location Data
                        </h3>
                        <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                          We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-['Space_Grotesk'] text-[14px] md:text-[16px] font-bold text-[#FF00A2]">
                          Google API
                        </h3>
                        <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                          Our use of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Information Retention Section */}
              <section className="mt-12">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  8. How Long Do We Keep Your Information?
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                  <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90 italic">
                    In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.
                  </p>
                  <div className="space-y-4">
                    <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                      We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.
                    </p>
                    <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                      When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
                    </p>
                  </div>
                </div>
              </section>

              {/* Information Security Section */}
              <section className="mt-12">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  9. How Do We Keep Your Information Safe?
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                  <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90 italic">
                    In Short: We aim to protect your personal information through a system of organizational and technical security measures.
                  </p>
                  <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                    <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                      Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
                    </p>
                  </div>
                </div>
              </section>

              {/* Minors Information Section */}
              <section className="mt-12">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  10. Do We Collect Information From Minors?
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                  <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90 italic">
                    In Short: We do not knowingly collect data from or market to children under 18 years of age.
                  </p>
                  <div className="space-y-4">
                    <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                      We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records.
                    </p>
                    <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                      <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                        If you become aware of any data we may have collected from children under age 18, please contact us at{' '}
                        <a href="mailto:privacy@dragspace.com" className="text-[#FF00A2] hover:underline">privacy@dragspace.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Privacy Rights Section */}
              <section className="mt-12">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  11. What Are Your Privacy Rights?
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                  <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90 italic">
                    In Short: Depending on your location, you have rights that allow you greater access to and control over your personal information.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="border-l-2 border-[#FF00A2] pl-4">
                      <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2] mb-2">
                        Your Rights
                      </h3>
                      <ul className="list-disc pl-6 space-y-2 text-white/90">
                        <li>Request access to your personal information</li>
                        <li>Request rectification or erasure</li>
                        <li>Restrict processing of your personal information</li>
                        <li>Data portability (if applicable)</li>
                        <li>Object to processing of your personal information</li>
                      </ul>
                    </div>

                    <div className="border-l-2 border-[#FF00A2] pl-4">
                      <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2] mb-2">
                        Account Information
                      </h3>
                      <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                        You can review, change, or terminate your account at any time by:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-white/90">
                        <li>Logging in to your account settings</li>
                        <li>Requesting account termination</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* DNT Features Section */}
              <section className="mt-12">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  12. Controls for Do-Not-Track Features
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                  <div className="space-y-4">
                    <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                      Most web browsers and mobile applications include a Do-Not-Track ("DNT") feature or setting. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.
                    </p>
                  </div>
                </div>
              </section>

              {/* US Residents Rights Section */}
              <section className="mt-12">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  13. Do United States Residents Have Specific Privacy Rights?
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                  <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90 italic">
                    In Short: US residents may have specific rights regarding their personal information, depending on their state of residence.
                  </p>
                  <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                    <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                      If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have specific rights regarding your personal information.
                    </p>
                  </div>
                </div>
              </section>

              {/* Categories Table Section */}
              <section className="mt-12">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  Categories of Personal Information We Collect
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                  <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                    We have collected the following categories of personal information in the past twelve (12) months:
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-[#FF00A2]/30">
                          <th className="py-4 px-4 text-left font-['Space_Grotesk'] text-[14px] md:text-[16px] font-bold text-[#FF00A2]">Category</th>
                          <th className="py-4 px-4 text-left font-['Space_Grotesk'] text-[14px] md:text-[16px] font-bold text-[#FF00A2]">Examples</th>
                          <th className="py-4 px-4 text-left font-['Space_Grotesk'] text-[14px] md:text-[16px] font-bold text-[#FF00A2]">Collected</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            category: "A. Identifiers",
                            examples: "Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name",
                            collected: "YES"
                          },
                          {
                            category: "B. Personal information as defined in the California Customer Records statute",
                            examples: "Name, contact information, education, employment, employment history, and financial information",
                            collected: "YES"
                          },
                          {
                            category: "C. Protected classification characteristics under state or federal law",
                            examples: "Gender, age, date of birth, race and ethnicity, national origin, marital status, and other demographic data",
                            collected: "YES"
                          },
                          {
                            category: "D. Commercial information",
                            examples: "Transaction information, purchase history, financial details, and payment information",
                            collected: "NO"
                          },
                          {
                            category: "E. Biometric information",
                            examples: "Fingerprints and voiceprints",
                            collected: "NO"
                          },
                          {
                            category: "F. Internet or other similar network activity",
                            examples: "Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements",
                            collected: "NO"
                          },
                          {
                            category: "G. Geolocation data",
                            examples: "Device location",
                            collected: "YES"
                          },
                          {
                            category: "H. Audio, electronic, sensory, or similar information",
                            examples: "Images and audio, video or call recordings created in connection with our business activities",
                            collected: "NO"
                          },
                          {
                            category: "I. Professional or employment-related information",
                            examples: "Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us",
                            collected: "NO"
                          },
                          {
                            category: "J. Education Information",
                            examples: "Student records and directory information",
                            collected: "NO"
                          },
                          {
                            category: "K. Inferences drawn from collected personal information",
                            examples: "Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual's preferences and characteristics",
                            collected: "NO"
                          },
                          {
                            category: "L. Sensitive personal Information",
                            examples: "",
                            collected: "NO"
                          }
                        ].map((row, index) => (
                          <tr 
                            key={index} 
                            className={`border-b border-white/10 ${index % 2 === 0 ? 'bg-[#1D1D1D]/20' : ''}`}
                          >
                            <td className="py-4 px-4 font-['Space_Grotesk'] text-[14px] md:text-[16px] text-white/90 align-top">
                              {row.category}
                            </td>
                            <td className="py-4 px-4 font-['Space_Grotesk'] text-[14px] md:text-[16px] text-white/90">
                              {row.examples}
                            </td>
                            <td className="py-4 px-4 font-['Space_Grotesk'] text-[14px] md:text-[16px] text-white/90 align-top">
                              <span className={`inline-block px-2 py-1 rounded ${row.collected === "YES" ? "bg-[#FF00A2]/20 text-[#FF00A2]" : "bg-white/10 text-white/60"}`}>
                                {row.collected}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Additional Collection Information */}
              <section className="mt-12">
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-6">
                  <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                    We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-white/90">
                    <li>Receiving help through our customer support channels;</li>
                    <li>Participation in customer surveys or contests; and</li>
                    <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
                  </ul>

                  <div className="space-y-4">
                    <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90">
                      We will use and retain the collected personal information as needed to provide the Services or for:
                    </p>
                    <ul className="space-y-2 text-white/90">
                      {['A', 'B', 'C', 'G', 'H'].map((category) => (
                        <li key={category} className="flex gap-2">
                          <span className="text-[#FF00A2]">•</span>
                          <span>Category {category} - As long as the user has an account with us</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Regional Privacy Rights */}
              <section className="mt-12">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  14. Do Other Regions Have Specific Privacy Rights?
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg space-y-8">
                  <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90 italic">
                    In Short: You may have additional rights based on the country you reside in.
                  </p>

                  {/* Australia and New Zealand */}
                  <div className="space-y-4">
                    <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2]">
                      Australia and New Zealand
                    </h3>
                    <div className="space-y-4">
                      <p className="text-white/90">We collect and process your personal information under the obligations and conditions set by Australia's Privacy Act 1988 and New Zealand's Privacy Act 2020 (Privacy Act).</p>
                      <ul className="list-disc pl-6 space-y-2 text-white/90">
                        <li>offer you the products or services that you want</li>
                        <li>respond to or help with your requests</li>
                        <li>manage your account with us</li>
                        <li>confirm your identity and protect your account</li>
                      </ul>
                    </div>
                  </div>

                  {/* Republic of South Africa */}
                  <div className="space-y-4">
                    <h3 className="font-['Space_Grotesk'] text-[16px] md:text-[18px] font-bold text-[#FF00A2]">
                      Republic of South Africa
                    </h3>
                    <div className="bg-[#1D1D1D]/50 p-4 rounded border border-[#FF00A2]/20">
                      <p className="text-white/90 mb-4">The Information Regulator (South Africa)</p>
                      <div className="space-y-2">
                        <p className="text-white/90">General enquiries: <a href="mailto:enquiries@inforegulator.org.za" className="text-[#FF00A2] hover:underline">enquiries@inforegulator.org.za</a></p>
                        <p className="text-white/90">Complaints: <a href="mailto:PAIAComplaints@inforegulator.org.za" className="text-[#FF00A2] hover:underline">PAIAComplaints@inforegulator.org.za</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Updates to Notice */}
              <section className="mt-12">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  15. Do We Make Updates To This Notice?
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                  <p className="font-['Space_Grotesk'] text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/90 italic">
                    In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.
                  </p>
                  <p className="mt-4 text-white/90">
                    We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section className="mt-12">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  16. How Can You Contact Us About This Notice?
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                  <div className="space-y-2 text-white/90">
                    <p>If you have questions or comments about this notice, you may contact us:</p>
                    <div className="mt-4 space-y-2">
                      <p>Email: <a href="mailto:privacy@dragspace.com" className="text-[#FF00A2] hover:underline">privacy@dragspace.com</a></p>
                      <p>Mail:</p>
                      <div className="pl-4">
                        <p>DragSpace, LLC</p>
                        <p>2000 West Loop South</p>
                        <p>Suite 2200</p>
                        <p>Houston, TX 77027</p>
                        <p>United States</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Review and Update Data */}
              <section className="mt-12 mb-16">
                <h2 className="font-['Space_Grotesk'] text-[20px] md:text-[24px] font-bold text-[#FF00A2] mb-4">
                  17. How Can You Review, Update, Or Delete The Data We Collect From You?
                </h2>
                <div className="bg-[#1D1D1D]/30 p-6 rounded-lg">
                  <p className="text-white/90">
                    You have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. To request to review, update, or delete your personal information, please{' '}
                    <a href="#" className="text-[#FF00A2] hover:underline">submit a data subject access request</a>.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;