import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Landing/Footer/Footer';

const TermsAndConditions = () =>{
    const image = "https://cdn-icons-png.flaticon.com/512/1152/1152755.png"

    return(
        <div className="bg-[#eff0f3] w-full dark:bg-[#1b1a1f] dark:text-[#F0EEEE]">
            <Navbar/>
            <div>
                <div className="w-full flex flex-row items-center justify-center ml-[10px] animate-tracking-animation">
                        <span className="font-bold text-4xl sm:text-7xl text-[#201008] dark:text-white">
                            Paws
                        </span>
                        <span className="font-bold text-4xl sm:text-7xl text-[#ff7272]">
                            Founding
                        </span>
                            
                </div>
                <div className="w-full flex flex-row mt-6 items-center justify-center ml-[10px] animate-tracking-animation">
                        <span className="font-bold text-2xl sm:text-5xl text-[#ff7272] text-[#201008] ">
                            Terms and 
                        </span>
                        <span className=" indent-4 font-bold text-2xl sm:text-5xl text-[#201008] dark:text-white">
                            Conditions
                        </span>
                            
                </div>
                <div className="flex flex-col p-6 w-full h-full items-center">
                    <div className="w-full pt-6 font-bold text-xl text-justify flex flex-col items-center justify-center animate-textFocus-animation sm:text-2xl">
                        <p className="w-11/12 p-2 sm:w-3/4 ">
                            Welcome to Paws Founding! 
                        </p>
                        <p className="w-11/12 p-2 sm:w-3/4 ">
                            These terms and conditions describe the rules and regulations for the use of the PawsFounding website, located at pf-henry-grupo05.vercel.app.
                        </p>
                        <p className="w-11/12 p-2 md:w-3/4">
                            By accessing this website, we assume that you accept these terms and conditions. Please do not continue using PawsFounding if you do not agree to all of the terms and conditions set forth on this page.
                        </p>
                    </div>
                    <div className="w-full pt-6 font-bold text-xl text-justify flex flex-col items-center justify-center animate-textFocus-animation sm:text-2xl">
                        <label className="text-start mb-2 font-bold w-11/12 p-2 sm:w-3/4">
                        <strong>License:</strong>
					    </label>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                            Unless otherwise noted, PawsFounding and/or its licensors own the intellectual property rights to all material on PawsFounding. All intellectual property rights are reserved. You may access from PawsFounding for your personal use subject to the restrictions set forth in these terms and conditions.
                        </p>
                        <label className="text-start mb-2 ml-4 font-bold w-11/12 p-2 sm:w-3/4">
                            You must not:
					    </label>
                        <ul className="text-start mb-2 ml-14 font-bold w-11/12 p-2 list-disc sm:w-3/4">
                            <li>
                                Copy or republish PawsFounding material
                            </li>
                            <li>
                                Sell, rent or sublicense material from PawsFounding
                            </li>
                            <li>
                                Reproduce, duplicate or copy PawsFounding material
                            </li>
                            <li>
                                Redistribute PawsFounding content
                            </li>
                        </ul>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                            This agreement will commence on the present date.
                        </p>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                            Parts of this website offer users the opportunity to post and exchange opinions and information in certain areas. PawsFounding does not filter, edit, publish or review comments prior to their presence on the website. Comments do not reflect the views or opinions of PawsFounding, its agents and/or affiliates. Comments reflect the views and opinions of the person posting. To the extent permitted by applicable laws, PawsFounding shall not be liable for any comments or for any liability, damages or expenses caused or suffered as a result of any use or posting or appearance of comments on this website.
                        </p>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                            PawsFounding reserves the right to monitor all comments and remove any that may be deemed inappropriate, offensive, or otherwise in breach of these Terms and Conditions.
                        </p>
                        <label className="text-start mb-2 ml-4 font-bold w-11/12 p-2 sm:w-3/4">
                            You warrant and represent that:
					    </label>
                        <ul className="text-start mb-2 ml-14 font-bold w-11/12 p-2 list-disc sm:w-3/4">
                            <li>
                                You have the right to post comments on our website and you have all necessary licenses and consents to do so;
                            </li>
                            <li>
                                Comments do not invade any intellectual property rights, including without limitation the copyrights, patents or trademarks of any third party;
                            </li>
                            <li>
                                Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material, which is an invasion of privacy.
                            </li>
                            <li>
                                Comments will not be used to solicit or promote custom or present business or commercial activities or illegal activities.
                            </li>
                        </ul>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                             You hereby grant PawsFounding a non-exclusive license to use, reproduce, edit, and authorize others to use, reproduce, and edit any of your comments in any and all forms, formats, or media.
                        </p>
                        <label className="text-start mb-2 font-bold w-11/12 p-2 sm:w-3/4">
                             <strong>Hyperlinks to our content:</strong>
					    </label>
                        <label className="text-start mb-2 ml-4 font-bold w-11/12 p-2 sm:w-3/4">
                            The following organizations may link to our website without prior written approval:
					    </label>
                        <ul className="text-start mb-2 ml-14 font-bold w-11/12 p-2 list-disc sm:w-3/4">
                            <li>
                                Governmental agencies;
                            </li>
                            <li>
                                Search engines;
                            </li>
                            <li>
                                News organizations;
                            </li>
                            <li>
                                Online directory distributors may link to our website in the same way that they hyperlink to the websites of other listed companies;
                            </li>
                            <li>
                                Systemwide Accredited Businesses, except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our website.
                            </li>
                        </ul>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                            These organizations may link to our home page, publications, or other information on the site as long as the link: (a) is not misleading in any way; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits in the context of the linking party's site.
                        </p>
                        <label className="text-start mb-2 ml-4 font-bold w-11/12 p-2 sm:w-3/4">
                            We may consider and approve other link requests from the following types of organizations:
					    </label>
                        <ul className="text-start mb-2 ml-14 font-bold w-11/12 p-2 list-disc sm:w-3/4">
                            <li>
                                Commonly known consumer and/or business sources of information;
                            </li>
                            <li>
                                .com community sites;
                            </li>
                            <li>
                                Associations or other groups representing charities;
                            </li>
                            <li>
                                Online directory distributors;
                            </li>
                            <li>
                                Internet portals;
                            </li>
                            <li>
                                Accounting, law and consulting firms;
                            </li>
                            <li>
                                Educational institutions and trade associations.
                            </li>
                        </ul>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                            We will approve link requests from these organizations if: (a) the link would not cause us to view ourselves or our accredited businesses unfavorably; (b) the organization has no negative records with us; (c) the benefit to us of the visibility of the hyperlink compensates for the absence of PawsFounding; and (d) the link is in the context of general resource information.
                        </p>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                            These organizations may link to our home page as long as the link: (a) is not misleading in any way; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits in the context of the linking party's site.
                        </p>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                            If you are one of the organizations listed in paragraph 2 and are interested in linking to our website, you should let us know by sending an email to PawsFounding. It includes your name, the name of your organization, contact information, as well as the URL of your site, a list of the URLs from which you intend to link to our website, and a list of the URLs of our site at which you would like to access. Please allow 2-3 weeks for a response.
                        </p>
                        <label className="text-start mb-2 ml-4 font-bold w-11/12 p-2 sm:w-3/4">
                            Approved organizations may hyperlink to our website as follows:
					    </label>
                        <ul className="text-start mb-2 ml-14 font-bold w-11/12 p-2 list-disc sm:w-3/4">
                            <li>
                                By using our corporate name; either
                            </li>
                            <li>
                                By using the Uniform Resource Locator you are linking to; either
                            </li>
                            <li>
                                Use any other description of our linked website that makes sense within the context and format of the content on the linking party's site.
                            </li>
                        </ul>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                            No use of the PawsFounding logo or other graphic material for linking will be permitted without a trademark license agreement.
                        </p>
                        <label className="text-start mb-2 font-bold w-11/12 p-2 sm:w-3/4">
                            <strong>Responsibility for the content:</strong>
					    </label>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                            We will not be responsible for any content that appears on your website. You agree to protect and defend us against all claims made on your website. No link(s) should appear on any website that could be construed as defamatory, obscene or criminal, or that infringes, otherwise violates or advocates the infringement or other violation of the rights of third parties.
                        </p>
                        <label className="text-start mb-2 font-bold w-11/12 p-2 sm:w-3/4">
                            <strong>Reservation of rights:</strong>
					    </label>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                            We reserve the right to request that you remove all links or any particular link to our website. You agree to immediately remove all links to our website upon request. We also reserve the right to modify these terms and conditions and its linking policy at any time. By continually linking to our website, you agree to be bound by and abide by these linking terms and conditions.
                        </p>
                        <label className="text-start mb-2 font-bold w-11/12 p-2 sm:w-3/4">
                            <strong>Removal of links from our website:</strong>
					    </label>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                             If you find any link on our site that is offensive for any reason, you can contact and inform us at any time. We will consider requests to remove links, but we are not required to do so or respond directly.
                        </p>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                            We do not make sure that the information on this website is correct. We do not guarantee its completeness or accuracy, nor do we promise to make sure that the website remains available or that the material on the site is kept up to date.
                        </p>
                        <label className="text-start mb-2 font-bold w-11/12 p-2 sm:w-3/4">
                            <strong>Disclaimer:</strong>
					    </label>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                            To the fullest extent permitted by applicable law, we exclude all representations, warranties and conditions relating to and use of our website. Nothing in this disclaimer:
                        </p>
                        <ul className="text-start mb-2 ml-14 font-bold w-11/12 p-2 list-disc sm:w-3/4">
                            <li>
                                Limit or exclude our or your liability for death or personal injury;
                            </li>
                            <li>
                                Limit or exclude our or your liability for fraud or fraudulent misrepresentation;
                            </li>
                            <li>
                                Limit any of our or your liabilities in any way that is not permitted under applicable law; either
                            </li>
                            <li>
                                Will exclude any of our or your liabilities that may not be excluded under applicable law.
                            </li>
                        </ul>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                            The limitations and prohibitions of liability set forth in this section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) will govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort, and for breach of legal obligation.
                        </p>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                            As long as the website and the information and services on the site are provided free of charge, we will not be liable for any loss or damage of any nature.
                        </p>
                        <label className="text-start mb-2 font-bold w-11/12 p-2 sm:w-3/4">
                            <strong>Donations:</strong>
					    </label>
                        <p className="w-11/12 p-2 ml-4 sm:w-3/4 ">
                            PawsFounding is not responsible under any point of view for issues that have to do with donations to NGOs or shelters.
                        </p>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center p-2 animate-textFocus-animation">
                        <img className="w-40 h-40 dark:invert" src={image} alt='Not Found'/>
                    </div>
                </div>
                
            </div>
            <div className="flex mb-0">
                <Footer/>
            </div>

        </div>
    )
};

export default TermsAndConditions;