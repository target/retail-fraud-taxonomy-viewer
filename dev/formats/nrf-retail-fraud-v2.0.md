# NRF Retail Fraud Taxonomy v2.0

Published 14 July 2026 by the National Retail Federation, the Retail & Hospitality ISAC, Target Corporation and industry partners, with support from The Chertoff Group.

Web version: <https://aptmelloncollie.github.io/nrf-fraud-taxonomy>

> Unofficial rendering. Generated from the text of the published document, entry by entry. Descriptions, guidance and references are reproduced verbatim. See [Corrections](#corrections) for every point where this file departs from the source.

**51** techniques · **32** mitigations · **15** detection sources · **5** tactics · **3** channels · **3** schemes

---

## Contents

- [Tactics](#tactics)
- [Channels](#channels)
- [Schemes](#schemes)
- [Matrix](#matrix)
- [Techniques](#techniques)
- [Mitigations](#mitigations)
- [Detection sources](#detection-sources)
- [Corrections](#corrections)

---

## Tactics

| Tactic | Description | Techniques |
|---|---|---|
| Pre-Compromise | Operations that occur prior to compromise. | 12 |
| Initial Access | Stealing, generating, confirming, or otherwise obtaining a legitimate gift card, account, or other resource | 13 |
| Defense Evasion | Techniques that are used to bypass security measures and fraud controls | 6 |
| Control | Physically or digitally gaining control of a resource from a customer or retailer | 21 |
| Monetization | Converting illicitly gathered resources into liquid funds or an item that can be converted into liquid funds | 12 |

## Channels

| Channel | Techniques |
|---|---|
| Analog | 32 |
| Digital | 44 |
| Social Engineering | 26 |

## Schemes

| Scheme | Description | Techniques |
|---|---|---|
| Gift Card Fraud | Tampering, generating, stealing, or otherwise using a gift card in an unauthorized manner to extract resources. | 22 |
| Account Takeover | Gaining unauthorized access to a victim's account | 12 |
| Return Fraud | Deliberate exploitation of a return and refund policies to gain monetary value, store credit, gift cards, or replacement merchandise. | 25 |

## Matrix

| Pre-Compromise | Initial Access | Defense Evasion | Control | Monetization |
|---|---|---|---|---|
| [Reconnaissance](#ft1001) | [Password Reset](#ft1006) | [Valid Accounts](#ft1104) | [Gift Card Extortion](#ft1102) | [Resale](#ft1301) |
| [Fake Pages](#ft1003) | [Insider Recruitment](#ft1010) | [VOIP Abuse](#ft1401) | [Valid Accounts](#ft1104) | [Checkout](#ft1303) |
| [Acquire Database](#ft1004) | [Impersonation Of Retail Employee](#ft1011) | [Digital Wallet Apps](#ft1402) | [Gift Card Return](#ft1201) | [Fraudulent Refund](#ft1304) |
| [Gift Card Number Generation](#ft1005) | [Shoplifting](#ft1101) | [Cryptocurrency](#ft1403) | [Gift Card Merge](#ft1202) | [Cryptocurrency](#ft1403) |
| [Password Reset](#ft1006) | [Gift Card Extortion](#ft1102) | [Gift Cards as Defense Evasion](#ft1404) | [Gift Card Tampering](#ft1203) |  |
| [Proxy Abuse](#ft1007) | [Check Gift Card Balance](#ft1103) |  | [Gift Card Redemption](#ft1204) |  |
| [Third Party Supplier Manipulation](#ft1008) | [Valid Accounts](#ft1104) |  | [Loyalty Points Abuse](#ft1205) |  |
| [Fake Receipt Generation](#ft1009) | [Credential Stuffing](#ft1105) |  | [Item Manipulation](#ft1206) |  |
| [Insider Recruitment](#ft1010) |  |  | [Returns Process Exploitation](#ft1207) |  |
| [Impersonation Of Retail Employee](#ft1011) |  |  | [Wardrobing](#ft1209) |  |
| [Valid Accounts](#ft1104) |  |  | [Marketplace Exploitation](#ft1302) |  |
|  |  |  | [Fraudulent Refund](#ft1304) |  |
|  |  |  | [Cryptocurrency](#ft1403) |  |

---

## Techniques

### Reconnaissance | FT1001

<a id="ft1001"></a>

**Tactic(s):** Pre-Compromise · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** Gift Card Fraud | Account Takeover

Fraudsters actively or passively gather information that can be used to support operations. Information may include details of the victim organization, infrastructure, or staff/personnel. This information can be leveraged by the fraudster to aid in other phases of the adversary lifecycle, such as using gathered information to plan and execute future operations. Threat actors will attempt to create accounts, wish lists, and other related assets using lists of usernames and credentials from breached databases. If the attempt fails, it signals to the actor that the account already exists and is a good candidate for credential stuffing.

**Mitigations**

- **[FM1006](#fm1006) Training and Awareness** — At physical locations, training employees to identify and report suspicious individuals to security.
- **[FM1016](#fm1016) Security Guard** — At physical locations, use a security guard to identify and deter reconnaissance attempts.
- **[FM1018](#fm1018) Software Configuration** — Fully decommission obsolete login software that may not be protected by current security protocols. Redirect login requests to obsolete software to follow the approved login flow.

**Detection opportunities**

- **[FD1007](#fd1007) Network Traffic Attributes** — Automated network reconnaissance will scan internet resources in a manner that a normal user typically will not. Monitor for connections to suspicious ports and traversal to suspicious directories such as www.mywebsite.com/admin or www.mywebsite.com/phpadmin
- **[FD1009](#fd1009) Online Identities** — When account creation has limited restrictions, fraudsters often create test accounts to develop automation, test fraud techniques, or validate stolen credentials. These accounts frequently use fake identity information and can provide insight into an actor’s methods and intent. Organizations should monitor account creation activity for abnormal behavior, as fraudsters may also use registration flows to determine whether accounts already exist before attempting credential-based attacks.
- **[FD1002](#fd1002) Video Surveillance Systems** — At physical locations, use video surveillance to identify and report suspicious individuals to security.

**References**

- MITRE ATT&CK

### Fake Pages | FT1003

<a id="ft1003"></a>

**Tactic(s):** Pre-Compromise · **Channel(s):** Digital · **Scheme(s):** Gift Card Fraud | Account Takeover

The fraudster creates a web page that may mimic a legitimate website to fool victims into divulging information. This website may visually appear to be legitimate or have a URL that is like the legitimate website.

One example of this is to register a domain that looks or sounds like a legitimate website. If www.legitimatewebsite.com was the target the fraudster may register a website similar to www.legitimatewebsite.io or www.legitwebsite.com. Using this along with similar visual elements, the fraudster can fool victims into divulging information such as account name and password.

**Mitigations**

- **[FM1007](#fm1007) Website Takedown Requests** — When a fake page is identified file a takedown request with the Website Host and DNS Registrar.
- **[FM1013](#fm1013) DNS Registration** — Identify potential URLs that may be mistaken for the legitimate website and register them so they cannot be used by fraudsters.

**Detection opportunities**

- **[FD1007](#fd1007) Network Traffic Attributes** — Monitor domain registration, certificate transparency logs, and phishing sites to identify sites established with your branding but designed to fool your customers into divulging information.

**References**

- Industry Partner Collaboration

### Acquire Database | FT1004

<a id="ft1004"></a>

**Tactic(s):** Pre-Compromise · **Channel(s):** Digital · **Scheme(s):** Gift Card Fraud | Account Takeover

Fraudster will, through legitimate or illegal means, acquire databases that may be used for future operations. These databases may range from legitimate marketing information sold by reputable companies to data stolen from victims.

Some examples of databases that can be acquired to support operations are account databases, marketing information, gift card numbers, and personally identifiable information (PII).

**Mitigations**

- **[FM1014](#fm1014) Password Policy** — Encourage using strong passwords with sufficient length and complexity. Discourage reusing passwords.

**Detection opportunities**

- **[FD1009](#fd1009) Online Identities** — Subscribe to breach databases and monitor logins for usage of known or publicly compromised credentials.

**References**

- MITRE ATT&CK
- <https://attack.mitre.org/techniques/T1650/>
- Top 10 Digital Commerce Account Risks & How to Mitigate Them by Gunnar Peterson
- <https://www.forter.com/blog/rh-isac-account-risk-mitigation/>
- Authentication and Access to Financial Institution Services and Systems
- <https://www.ffiec.gov/guidance/Authentication-and-Access-to-Financial-Institution-Services-and-Systems.pdf>

### Gift Card Number Generation | FT1005

<a id="ft1005"></a>

**Tactic(s):** Pre-Compromise · **Channel(s):** Digital · **Scheme(s):** Gift Card Fraud

Fraudster uses an algorithm or brute force to generate gift card numbers that can potentially be legitimate. This can be conducted by predicting or acquiring the algorithm used to generate gift card numbers and creating them. This can be used with Check Gift Card Balance to identify legitimate gift cards with funds for future use.

**Mitigations**

- **[FM1011](#fm1011) Brute Force Resistant Gift Card Numbers** — Generate long and complicated gift card numbers that are resistant to prediction.

**Detection opportunities**

- **— None** — This technique cannot be easily detected by organizational controls due to it occurring outside of the organization’s scope.

**References**

- Industry Partner Collaboration

### Password Reset | FT1006

<a id="ft1006"></a>

**Tactic(s):** Pre-Compromise | Initial Access · **Channel(s):** Digital · **Scheme(s):** Account Takeover

Actors abuse the password reset functionality to verify whether an account exists on a website. If the website provides feedback that indicates the account does exist, the actor then proceeds to attempt a login for that account using exposed credentials. If the account does not exist, the actor does not submit a login request to avoid expending unnecessary resources on an invalid account.

Actors compromise the victim’s email account and then submit a password reset request to the targeted site. The actor is able to change the victim’s password to one of their choosing, allowing them access to the victim’s account.

**Mitigations**

- **[FM1019](#fm1019) Neutral Feedback** — Do not provide feedback that notifies an actor if the account exists or does not exist on the website.
- **[FM1020](#fm1020) Customer Notification** — Notify all available contacts on the account when a password is reset.

**Detection opportunities**

- **[FD1003](#fd1003) Behavioral Attributes** — Monitor password reset endpoints for abnormal behavior.
- **[FD1006](#fd1006) Velocity Attributes** — Identify automated attempts to validate a credential list by volume of attempts.

**References**

- Industry Partner Collaboration

### Proxy Abuse | FT1007

<a id="ft1007"></a>

**Tactic(s):** Pre-Compromise · **Channel(s):** Digital · **Scheme(s):** Account Takeover

Actors abuse legitimate or illegal proxy services that act as an intermediary for requests from clients seeking resources from other servers, effectively masking the fraudster’s IP address or other network attributes. Some examples of this are use of commercial VPN services, proxies through hosting providers, residential proxies, compromised machines such as botnets and malware infected hosts, and TOR services.

**Mitigations**

- **[FM1008](#fm1008) Behavior Prevention** — Block traffic from known proxies, TOR 7exit nodes and infected machines.

**Detection opportunities**

- **[FD1007](#fd1007) Network Traffic Attributes** — Aggregate IP addresses to identify the common carriers / autonomous system numbers. Establish normal and abnormal behavior for traffic originating from those networks.

**References**

- MITRE ATT&CK
- <https://attack.mitre.org/techniques/T1090/>

### Third Party Supplier Manipulation | FT1008

<a id="ft1008"></a>

**Tactic(s):** Pre-Compromise · **Channel(s):** Analog | Digital · **Scheme(s):** Return Fraud

A supplier or manufacturer knowingly produces and distributes nongenuine goods with the intent (or willful disregard of the likelihood) that these items will be returned to legitimate retailers for refunds, store credit, or replacements, thereby monetizing counterfeits via the retailer’s returns channel and shifting losses to the merchant. This scheme often leverages high demand SKUs and categories with permissive return policies to maximize refund yield and minimize detection.

**Mitigations**

- **[FM1208](#fm1208) Law Enforcement** — Report known counterfeiters or other confirmed illegal activity to Law Enforcement for action.

**Detection opportunities**

- **[FD1012](#fd1012) Controlled Purchase** — Purchase items from Third Party Supplier to identify indicators of fraud.
- **[FD1010](#fd1010) Transaction Data** — Identify indicators of counterfeit or fake items such as poor packaging or labeling with incorrect or repeating serial numbers.
- **[FD1004](#fd1004) Time-Based Attributes** — Identify returns that happen quickly. This can range from a few minutes from purchase to a day depending on fraudster behavior.
- **[FD1006](#fd1006) Velocity Attributes** — Fraudsters will attempt a high number of returns at once. This may be multiples of same item or different items.

**References**

- Industry Partner Collaboration

### Fake Receipt Generation | FT1009

<a id="ft1009"></a>

**Tactic(s):** Pre-Compromise · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** Return Fraud

A fraudulent receipt created by a fraudster that appears legitimate. The primary purpose is to fabricate proof of purchase or transaction to deceive systems, individuals, or institutions and often to claim refunds, reimbursements, or validate false returns.

**Mitigations**

- **[FM1008](#fm1008) Behavior Prevention** — Validate the receipt with store records (preferably by electronic scan). Do not permit use of receipts without validation of store-controlled records.
- **[FM1006](#fm1006) Training and Awareness** — Identify fake receipts, which may appear visually different.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction Data** — Identify refunds that do not have proper proof of purchase.
- **[FD1006](#fd1006) Velocity Attributes** — A large volume of receipts may obscure or overlap with a genuine receipt. A large number of items on the receipt.

**References**

- Industry Partner Collaboration

### Insider Recruitment | FT1010

<a id="ft1010"></a>

**Tactic(s):** Pre-Compromise | Initial Access · **Channel(s):** Social Engineering · **Scheme(s):** Return Fraud

A form of social engineering, this technique involves fraudsters enlisting employees, typically in customer service, logistics, or returns processing, to help execute fraudulent return schemes from within the organization. These insiders are incentivized with payments or a share of the refund value to manipulate internal systems, such as marking items as undelivered, falsifying damage claims, or overriding verification protocols. Recruitment often begins on social platforms like Telegram, LinkedIn, or even customer service contact channels with communication quickly shifting to encrypted channels to avoid detection. Once embedded, insiders can process large volumes of fraudulent refunds, making the scheme highly scalable and difficult to trace.

**Mitigations**

- **[FM1006](#fm1006) Training and Awareness** — Train employees to recognize recruitment attempts and remind them of their role, ethical agreements, and consequences.
- **[FM1022](#fm1022) Escalation** — Require secondary approvals for sensitive actions that can be taken on behalf of customers to limit damage an insider could perform.

**Detection opportunities**

- **[FD1003](#fd1003) Behavioral Attributes** — Monitor employees’ interactions with other employees and discussions regarding potential payment or other ways to receive value for fraudulent activity. Insiders may attempt to hire employees to support their activity. Identify employees’ excessive referrals and the quality of those referrals. For call center or chat-based customer service operations, recruiters will often engage with many customer service representatives to find one who is willing or vulnerable. Identify customer attempts to offer money, jobs, or other reimbursement for actions taken at the retail store.
- **[FD1002](#fd1002) Video Surveillance Systems** — Use video surveillance system to identify and record suspicious activity for correlation as fraudsters may commit actions over a long period.

**References**

- Industry Partner Collaboration

### Impersonation Of Retail Employee | FT1011

<a id="ft1011"></a>

**Tactic(s):** Pre-Compromise | Initial Access · **Channel(s):** Social Engineering · **Scheme(s):** Return Fraud

A form of social engineering, this technique in returns fraud involves fraudsters posing as store staff, either physically, over the phone, or online, to manipulate return processes and bypass verification protocols. They may dress like employees, use fake IDs, or spoof contact details to gain trust and access, often requesting unauthorized refunds or overrides. In more advanced schemes, real employees are recruited to impersonate others or approve fraudulent returns, making fraud harder to detect and more scalable.

**Mitigations**

- **[FM1021](#fm1021) Identity Verification** — Establish identification and authentication procedures to prove someone is an employee in person or remotely.
- **[FM1006](#fm1006) Training and Awareness** — Train employees in stores to recognize impersonation attempts, posing as an employee, someone from headquarters, or a legitimate third party such as contractors.
- **[FM1022](#fm1022) Escalation** — Require secondary approvals for sensitive actions that the fraudster may ask employees to perform.

**Detection opportunities**

- **[FD1003](#fd1003) Behavioral Attributes** — Monitor employees’ interactions with other employees and discussions regarding potential payment or other ways to receive value for fraudulent activity. Insiders may attempt to hire employees to support their activity. Identify employees’ excessive referrals and the quality of those referrals. For call center or chat-based customer service operations, recruiters will often engage with many customer service representatives to find one who is willing or vulnerable. Identify customer attempts to offer money, jobs, or other reimbursements for actions taken at the retail store.
- **[FD1002](#fd1002) Video Surveillance Systems** — Use video surveillance systems to identify and record suspicious activity for correlation, as fraudsters may commit actions over a long period. Correlate suspicious individuals across multiple stores to identify fraudsters.

**References**

- Industry Partner Collaboration

### Shoplifting | FT1101

<a id="ft1101"></a>

**Tactic(s):** Initial Access · **Channel(s):** Analog · **Scheme(s):** Gift Card Fraud

Taking items from a store without paying for them. Shoplifting can range from concealing items in personal clothing or bags to swapping price tags to make items appear cheaper. Items shoplifted to support fraud are typically high value, small in size and easy to resell.

Examples of commonly stolen items to support fraud are Gift Cards, Electronics, and Luxury Goods.

**Mitigations**

- **[FM1017](#fm1017) Satchel Control** — Control the size and type of satchels that are permitted inside the store.
- **[FM1005](#fm1005) Anti-theft Prevention** — Additional physical protection of products from theft such as locked shelving, containers, and vending machines, and storing items behind checkout counter.
- **[FM1016](#fm1016) Security Guard** — At physical locations, use security guards to identify and deter shoplifting.

**Detection opportunities**

- **[FD1001](#fd1001) Anti-theft security tags** — Attach a device to items that will cause an alarm if removed from the store without authorization.
- **[FD1002](#fd1002) Video Surveillance Systems** — Monitor video feeds for suspicious activity around high value items.

**References**

- Detecting and Reporting the Illicit Financial Flows Tied to Organized Theft Groups (OTG) and Organized Retail Crime (ORC)
- <https://www.acams.org/en/media/document/29436>

### Gift Card Extortion | FT1102

<a id="ft1102"></a>

**Tactic(s):** Initial Access | Control · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** Gift Card Fraud

The fraudster obtains gift cards through coercion of a victim. This can involve many forms, including threats of violence, property damage, harm to reputation, or unwarranted government action, unlike robbery or theft where property is taken without consent.

A fraudster may pretend to be a representative of the government to coerce a victim through a fear response. They may convince a victim that they must purchase gift cards with their own funds and turn the gift card over to the fraudster.

Another common extortion scam is a fraudster pretending to be a relative of a victim who is being held against their will whether by criminals or a foreign government. They then convince the victim to purchase gift cards as restitution or a bribe to release their family member.

**Mitigations**

- **[FM1001](#fm1001) Primary Gift Card Lock In** — When a gift card is purchased, lock the gift card into the identity of the purchaser. Do not allow another person to use the gift card without identity verification or authentication.
- **[FM1002](#fm1002) Login Required** — Require an account before permitting purchase of or transfer of a gift card.
- **[FM1012](#fm1012) Gift Card Purchase Limit** — Enforce limits of quantity and/or the value that may be purchased by an interaction or person.
- **[FM1006](#fm1006) Training and Awareness** — Consumer fraud awareness and education campaigns, signage, pop-ups, and other forms of communication.

**Detection opportunities**

- **[FD1006](#fd1006) Velocity Attributes** — Monitor the purchase of gift cards by value and quantity from an individual by a predetermined value and/or time frame.
- **[FD1003](#fd1003) Behavioral Attributes** — Monitor for out-of-character purchases of an individual and their lifestyle.

**References**

- Detecting and Reporting the Illicit Financial Flows Tied to Organized Theft Groups (OTG) and Organized Retail Crime (ORC)
- <https://www.acams.org/en/media/document/29436>
- Avoiding and Reporting Gift Card Scams
- <https://consumer.ftc.gov/articles/avoiding-and-reporting-gift-card-scams#commonscams>

### Check Gift Card Balance | FT1103

<a id="ft1103"></a>

**Tactic(s):** Initial Access · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** Gift Card Fraud

**Sub-techniques:** [FT1103.001](#ft1103001), [FT1103.002](#ft1103002), [FT1103.003](#ft1103003)

The fraudster may abuse legitimate functions to confirm a gift card is active and has funds. To reduce overhead, retailers may have autonomous systems for gift card owners and recipients to check if their gift card is usable and has value. These systems are generally available to the public for interaction.

**Mitigations**

- **[FM1002](#fm1002) Login Required** — Require authentication before displaying gift card status or value.
- **[FM1003](#fm1003) Access Code Required** — Require an access code that is separate from the gift card number before revealing the status and funds on the gift cards.
- **[FM1209](#fm1209) Online Location Data** — Some physical locations should not be able to check gift card balance. Some locations may also be the source of repeated fraud attempts. Prevent the ability to check gift card status and funds based on locations.
- **[FM1210](#fm1210) Phone Number** — Automatically block phone numbers related to VOIP services and phone numbers that have been known to be used to perpetrate fraud.

**Detection opportunities**

- **[FD1007](#fd1007) Network Traffic Attributes** — Monitor for Network Traffic Attributes such as IP Address, DNS Name, ASN, and other digital location attributes especially if some of these sources have known fraud activity or have a high risk of fraud activity.
- **[FD1004](#fd1004) Time-Based Attributes** — Based on the location of your operations, monitor for activities that occur during off hours.
- **[FD1005](#fd1005) Device Attributes** — Monitor device factors such as device type, user agent string, operating system, cookies.
- **[FD1006](#fd1006) Velocity Attributes** — Monitor for number of requests based on a predetermined number of requests over a set amount of time.
- **[FD1008](#fd1008) VOIP Attribute** — Monitor for use of VOIP numbers that are not tied to a physical landline or mobile phone.

**References**

- Industry Partner Collaboration

### Check Gift Card Balance: Application | FT1103.001

<a id="ft1103001"></a>

**Tactic(s):** Initial Access · **Channel(s):** Digital · **Scheme(s):** Gift Card Fraud

**Sub-technique of:** [FT1103](#ft1103)

The fraudster may iteratively probe Web Applications using built-in functions in the Applications to confirm the gift card is active and has funds. The fraudster may use gift card numbers that are generated by brute force guessing, purchased from a source, or gathered from victims.

A fraudster may purchase a large amount of gift card numbers on the dark web. They will use the Web Application built-in Function and in a manual or automated fashion check to see if the gift card is active and has funds. This information can be used in future operations to convert the gift card into usable funds for the fraudster.

**Mitigations**

- **[FM1002](#fm1002) Login Required** — Require authentication before displaying gift card status or value.
- **[FM1003](#fm1003) Access Code Required** — Require an access code that is separate from the gift card number before revealing the status and funds on the gift cards.
- **[FM1209](#fm1209) Online Location Data** — Some physical locations should not be able to check gift card balance. Some locations may also be the source of repeated fraud attempts. Prevent the ability to check gift card status and funds based on locations.

**Detection opportunities**

- **[FD1007](#fd1007) Network Traffic Attributes** — Monitor for Network Traffic Attributes such as IP Address, DNS Name, ASN, and other digital location attributes especially if some of these sources have known fraud activity or have a high risk of fraud activity.
- **[FD1004](#fd1004) Time-Based Attributes** — Based on the location of your operations, monitor for activities that occur during off hours.
- **[FD1005](#fd1005) Device Attributes** — Monitor device factors such as device type, user agent string, operating system, cookies.
- **[FD1006](#fd1006) Velocity Attributes** — Monitor for number of requests based on a predetermined number of requests over a set amount of time.

**References**

- Industry Partner Collaboration

### Check Gift Card Balance: Phone Verification | FT1103.002

<a id="ft1103002"></a>

**Tactic(s):** Initial Access · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** Gift Card Fraud

**Sub-technique of:** [FT1103](#ft1103)

The fraudster may use a retailer-provided phone service to confirm a gift card is active and has funds. The fraudster may use gift card numbers that are generated by brute force guessing, purchased from a source, or gathered from victims.

**Mitigations**

- **[FM1003](#fm1003) Access Code Required** — Require an access code that is separate from the gift card number before revealing the status and funds on the gift cards.
- **[FM1008](#fm1008) Behavior Prevention** — Automatically block phone numbers related to VOIP services and phone numbers that have been known to be used to perpetrate fraud.

**Detection opportunities**

- **[FD1004](#fd1004) Time-Based Attributes** — Based on the location of your operations, monitor for activities that occur during off hours.
- **[FD1008](#fd1008) VOIP Attribute** — Monitor for use of VOIP numbers that are not tied to a physical landline or mobile phone.

**References**

- Industry Partner Collaboration

### Verification | FT1103.003

<a id="ft1103003"></a>

**Tactic(s):** Initial Access · **Channel(s):** Analog | Social Engineering · **Scheme(s):** Gift Card Fraud

**Sub-technique of:** [FT1103](#ft1103)

The fraudster uses legitimate functions inside a bricks-and-mortar store to verify status of gift cards. The fraudster may use Kiosks, Checkout, or Customer service to verify legitimacy of a gift card.

**Mitigations**

- **[FM1003](#fm1003) Access Code Required** — Require an access code that is separate from the gift card number before revealing the status and funds on the gift cards.

**Detection opportunities**

- **[FD1006](#fd1006) Velocity Attributes** — Monitor for gift cards a person is attempting to verify.

**References**

- Industry Partner Collaboration

### Valid Accounts | FT1104

<a id="ft1104"></a>

**Tactic(s):** Initial Access | Defense Evasion | Control · **Channel(s):** Digital · **Scheme(s):** Gift Card Fraud | Account Takeover | Return Fraud

**Sub-techniques:** [FT1104.001](#ft1104001), [FT1104.002](#ft1104002), [FT1104.003](#ft1104003)

The fraudster may obtain, create and abuse accounts to gain access, elevate access, or control a resource. Since these credentials are generally legitimate, they may be used to bypass access controls in place to protect resources. This can also be used to achieve persistence in a system.

One example of this is if a fraudster gains control over a loyalty account. The fraudster can control the spending of loyalty points to buy items to support monetization. If gift cards are tied to the accounts, this may also be a method to control gift card use.

**Mitigations**

- **[FM1004](#fm1004) Multi-Factor Authentication** — Use multiple forms of authentication such as username and password paired with a One-time Passcode before permitting access. Use passkeys linked to a known physical device as authentication factor. Require identity verification upon detection of access requests that are significantly different than what is expected for the individual.
- **[FM1014](#fm1014) Password Policy** — Encourage using strong passwords with sufficient length and complexity. Discourage reusing passwords.

**Detection opportunities**

- **[FD1007](#fd1007) Network Traffic Attributes** — Monitor for Network Traffic Attributes such as IP Address, DNS Name, ASN, and other digital location attributes especially if some of these sources have known fraud activity or have a high risk of fraud activity.
- **[FD1004](#fd1004) Time-Based Attributes** — Based on the location of your operations, monitor for activities that occur during off hours.
- **[FD1005](#fd1005) Device Attributes** — Monitor device factors such as device type, user agent string, operating system, cookies.
- **[FD1003](#fd1003) Behavioral Attributes** — Monitor for access attempts and purchases that are significantly different from known good behavior for each customer.

**References**

- MITRE ATT&CK
- <https://attack.mitre.org/techniques/T1078/>
- Top 10 Digital Commerce Account Risks & How to Mitigate Them by Gunnar Peterson
- <https://www.forter.com/blog/rh-isac-account-risk-mitigation/>
- Authentication and Access to Financial Institution Services and Systems
- <https://www.ffiec.gov/guidance/Authentication-and-Access-to-Financial-Institution-Services-and-Systems.pdf>
- NIST Digital Identity Guidelines 800-63
- <https://pages.nist.gov/800-63-3>

### Valid Accounts: Fraudulent Account | FT1104.001

<a id="ft1104001"></a>

**Tactic(s):** Pre-Compromise | Initial Access | Control · **Channel(s):** Digital · **Scheme(s):** Gift Card Fraud | Account Takeover | Return Fraud

**Sub-technique of:** [FT1104](#ft1104)

The fraudster uses a legitimate resource to create an account for malicious usage. These accounts may be used for reconnaissance and to probe the defenses of the victim’s applications.

One example of this is if a fraudster creates an account with fake information. Using this as a foothold the fraudster may gather information on the application itself such as naming convention, loyalty points, and other information that may be used to monetize the account.

**Mitigations**

- **[FM1004](#fm1004) Multi-Factor Authentication** — Before permitting account changes, use multiple forms of authentication such as username and password paired with a One-time Passcode before permitting access. If relevant, send confirmatory message to the original contact fields (e.g., original email address, phone number, street address).

**Detection opportunities**

- **[FD1007](#fd1007) Network Traffic Attributes** — Monitor for Network Traffic Attributes such as IP Address, DNS Name, ASN, and other digital location attributes especially if some of these sources have known fraud activity or have a high risk of fraud activity.
- **[FD1004](#fd1004) Time-Based Attributes** — Based on the location of your operations, monitor for activities that occur during off hours.
- **[FD1005](#fd1005) Device Attributes** — Monitor device factors such as device type, user agent string, operating system, cookies.
- **[FD1006](#fd1006) Velocity Attributes** — Monitor for accounts that are created quickly in succession from the same location or with similar features.

**References**

- Top 10 Digital Commerce Account Risks & How to Mitigate Them by Gunnar Peterson
- <https://www.forter.com/blog/rh-isac-account-risk-mitigation/>

### Valid Accounts: Fraudulent Account Update | FT1104.002

<a id="ft1104002"></a>

**Tactic(s):** Pre-Compromise | Initial Access | Control · **Channel(s):** Digital · **Scheme(s):** Gift Card Fraud | Account Takeover | Return Fraud

**Sub-technique of:** [FT1104](#ft1104)

The fraudster makes a change to an account without the knowledge of the account holder.

One example of this is if a fraudster convinces a helpdesk to update the phone number of a legitimate account to one they control. The fraudster can then use this to reset the password or otherwise authenticate to control the victim’s account.

**Mitigations**

- **[FM1004](#fm1004) Multi-Factor Authentication** — Use multiple forms of authentication such as username and password paired with a One-time Passcode before permitting access. Require identity verification upon detection of access requests that are significantly different than what is expected for the individual. Send confirmatory message to the original contact fields (e.g., original email address, phone number, street address).

**Detection opportunities**

- **[FD1007](#fd1007) Network Traffic Attributes** — Monitor for Network Traffic Attributes such as IP Address, DNS Name, ASN, and other digital location attributes especially if some of these sources have known fraud activity or have a high risk of fraud activity.
- **[FD1004](#fd1004) Time-Based Attributes** — Based on the location of your operations, monitor for activities that occur during off hours.
- **[FD1005](#fd1005) Device Attributes** — Monitor device factors such as device type, user agent string, operating system, cookies.
- **[FD1006](#fd1006) Velocity Attributes** — Monitor for accounts that are created quickly in succession from the same location or with similar features.
- **[FD1009](#fd1009) Online Identities** — Monitor for account creations with suspicious names that do not appear legitimate. Some examples are ABCD, AAA, QAZ, etc.

**References**

- Top 10 Digital Commerce Account Risks & How to Mitigate Them by Gunnar Peterson
- <https://www.forter.com/blog/rh-isac-account-risk-mitigation/>

### Valid Accounts: Authorized Account Abuse | FT1104.003

<a id="ft1104003"></a>

**Tactic(s):** Defense Evasion · **Channel(s):** Digital · **Scheme(s):** Gift Card Fraud | Account Takeover

**Sub-technique of:** [FT1104](#ft1104)

The fraudster persuades a legitimate customer to grant access to their account, enabling the fraudster to leverage a seasoned profile with an established purchase history and associated metadata. This tactic helps bypass or weaken fraud detection controls.

**Mitigations**

- **[FM1004](#fm1004) Multi-Factor Authentication** — Before permitting account changes, use multiple forms of authentication such as username and password paired with a One-time Passcode before permitting access. If relevant, send confirmatory message to the original contact fields (e.g., original email address, phone number, street address).

**Detection opportunities**

- **[FD1007](#fd1007) Network Traffic Attributes** — Monitor for Network Traffic Attributes such as IP Address, DNS Name, ASN, and other digital location attributes especially if some of these sources have known fraud activity or have a high risk of fraud activity.
- **[FD1004](#fd1004) Time-Based Attributes** — Based on the location of your operations, monitor for activities that occur during off hours.
- **[FD1005](#fd1005) Device Attributes** — Monitor device factors such as device type, user agent string, operating system, cookies.
- **[FD1006](#fd1006) Velocity Attributes** — Monitor for accounts that are created quickly in succession from the same location or with similar features.

**References**

- Top 10 Digital Commerce Account Risks & How to Mitigate Them by Gunnar Peterson
- <https://www.forter.com/blog/rh-isac-account-risk-mitigation/>

### Credential Stuffing | FT1105

<a id="ft1105"></a>

**Tactic(s):** Initial Access · **Channel(s):** Digital · **Scheme(s):** Account Takeover

Fraudsters abuse a variety of web automation tools to automate login attempts using credential lists known as “combolists.” Web automation serves a legitimate purpose in web application development and testing, but commercial projects can be abused by threat actors for illicit activity.

Fraudsters develop custom credential stuffing tools to automate login attempts. These tools can be site-specific or configurable via files known as “configs” which are then either sold or shared in underground communities. These tools range from simple scripts where technical details for the transaction are coded into the script itself, to fully configurable tools where actors can insert their own variables and other parameters into the automation.

**Mitigations**

- **[FM1008](#fm1008) Behavior Prevention** — Many commercial services provide bot detection and mitigation, often incorporated into content delivery networks and other management packages. Commonly available tooling includes default technical indicators which should be mitigated at the edge and automatically denied.

**Detection opportunities**

- **[FD1006](#fd1006) Velocity Attributes** — Monitor for surges in login attempts and other anomalous activity. Monitor the response to login attempts where a surge in attempts to access accounts that do not exist at the target organization is a strong indicator of automated credential stuffing.
- **[FD1003](#fd1003) Behavioral Attributes** — Monitor for repeated patterns of activity post-login that is an indicator that the activity is automated.

**References**

- MITRE ATT&CK
- <https://attack.mitre.org/techniques/T1110/004/>
- Top 10 Digital Commerce Account Risks & How to Mitigate Them by Gunnar Peterson
- <https://www.forter.com/blog/rh-isac-account-risk-mitigation/>

### Gift Card Return | FT1201

<a id="ft1201"></a>

**Tactic(s):** Control · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** Gift Card Fraud

The fraudster converts an illicitly acquired or invalid gift card for a legitimate gift card.

For example, a fraudster illicitly obtains a gift card. Through social engineering or taking advantage of a retailer’s legitimate system, they transfer the value from the illicitly obtained gift card to a new gift card that the fraudster legitimately owns.

**Mitigations**

- **[FM1015](#fm1015) Return Limit** — Do not exchange gift cards over a pre-determined value.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction Data** — Identify suspicious purchases and returns by gift card numbers.

**References**

- Detecting and Reporting the Illicit Financial Flows Tied to Organized Theft Groups (OTG) and Organized Retail Crime (ORC)
- <https://www.acams.org/en/media/document/29436>

### Gift Card Merge | FT1202

<a id="ft1202"></a>

**Tactic(s):** Control · **Channel(s):** Analog | Digital · **Scheme(s):** Gift Card Fraud

The fraudster obtains a gift card through legitimate means. Using a retailer-provided method they transfer value from an illicitly obtained gift to the legitimate gift cards.

For example, a fraudster purchases a legitimate gift card with a value of $5. They illicitly obtain multiple gift cards with values of $100 and $150. Using a legitimate retailer feature they combine gift cards. The values of the illicitly obtained gift cards are added to the legitimate one. The fraudster added $250 to their $5 gift card. They now have $255 on their legitimate gift card.

**Mitigations**

- **[FM1008](#fm1008) Behavior Prevention** — Do not permit merging of gift cards.
- **[FM1002](#fm1002) Login Required** — Require authentication before permitting transfer of gift card value.
- **[FM1003](#fm1003) Access Code Required** — Require an access code before permitting transfer of gift card value.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction Data** — Identify suspicious transfer of value from gift cards to other gift cards.
- **[FD1006](#fd1006) Velocity Attributes** — Identify suspicious transfers from many gift cards to one gift card. For example if 20 gift cards with value of $5 are added to a single gift card.

**References**

- Industry Partner Collaboration

### Gift Card Tampering | FT1203

<a id="ft1203"></a>

**Tactic(s):** Control · **Channel(s):** Analog · **Scheme(s):** Gift Card Fraud

Fraudster takes physical possession of an unactivated gift card and takes the information that allows them to control the gift card when it is funded and activated.

An example is a fraudster steals gift cards from a store. They copy down the pertinent information needed to control the gift card and verify funds such as gift card number and security pin. The fraudster then repackages the gift card and returns it to the store. When a victim purchases the gift card and loads value, the fraudster can spend the funds on the gift card without the victim’s awareness.

**Mitigations**

- **[FM1001](#fm1001) Primary Gift Card Lock in** — For gift cards, lock the Gift Card into the identity of the purchaser. Do not allow another person to use the gift card without identity verification or authentication.
- **[FM1002](#fm1002) Login Required** — For gift cards, require an account before permitting purchase of or transfer.
- **[FM1005](#fm1005) Anti-theft Prevention** — Store gift cards behind checkout counter to limit theft.
- **[FM1016](#fm1016) Security Guard** — At physical locations, use security guards to identify instances of fraudsters stealing gift cards and/or returning tampered gift cards.

**Detection opportunities**

- **[FD1002](#fd1002) Video Surveillance Systems** — At physical locations, use video surveillance to identify instances of fraudsters stealing gift cards and/or returning tampered gift cards

**References**

- Industry Partner Collaboration
- Detecting and Reporting the Illicit Financial Flows Tied to Organized Theft Groups (OTG) and Organized Retail Crime (ORC)
- <https://www.acams.org/en/media/document/29436>

### Gift Card Redemption | FT1204

<a id="ft1204"></a>

**Tactic(s):** Control · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** Gift Card Fraud

The fraudster obtains a gift card through legitimate or illicit means and purchases an item.

One example of this is a fraudster uses a gift card to purchase a high-value easy-to-sell item such as jewelry or electronics. The fraudster then can monetize these items through various strategies such as resale or drop shipping.

**Mitigations**

- **[FM1001](#fm1001) Primary Gift Card Lock in** — For gift cards, lock the gift card into the identity of the purchaser. Do not allow another person to use the gift card without identity verification or authentication.
- **[FM1002](#fm1002) Login Required** — For gift cards, require an account before permitting purchase of or transfer.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction Data** — Identify suspicious purchases of commonly resold items with potentially illicitly obtained gift cards.

**References**

- Detecting and Reporting the Illicit Financial Flows Tied to Organized Theft Groups (OTG) and Organized Retail Crime (ORC)
- <https://www.acams.org/en/media/document/29436>

### Loyalty Points Abuse | FT1205

<a id="ft1205"></a>

**Tactic(s):** Control · **Channel(s):** Digital · **Scheme(s):** Account Takeover

The fraudster converts loyalty points into items or gift cards that can be used for monetization.

One example of this is a fraudster successfully compromises a victim’s account through means such as Social Engineering. They can convert the victim’s loyalty points into a gift card that the fraudster controls. This gift card can be further used for monetization.

**Mitigations**

- **[FM1004](#fm1004) Multi-Factor Authentication** — Use multiple forms of authentication such as username and password paired with a One-time Passcode before permitting access. Require identity verification upon detection of access requests that are significantly different than what is expected for the individual.
- **[FM1014](#fm1014) Password Policy** — Encourage using strong passwords with sufficient length and complexity. Discourage reusing passwords.

**Detection opportunities**

- **[FD1007](#fd1007) Network Traffic Attributes** — Monitor for Network Traffic Attributes such as IP Address, DNS Name, ASN, and other digital location attributes especially if some of these sources have known fraud activity or have a high risk of fraud activity.
- **[FD1004](#fd1004) Time-Based Attributes** — Based on the location of your operations, monitor for activities that occur during off hours.
- **[FD1005](#fd1005) Device Attributes** — Monitor device factors such as device type, user agent string, operating system, cookies.
- **[FD1003](#fd1003) Behavioral Attributes** — Monitor for access attempts and purchases that are significantly different from known good behavior for each customer.

**References**

- Industry Partner Collaboration

### Item Manipulation | FT1206

<a id="ft1206"></a>

**Tactic(s):** Control · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** Return Fraud

**Sub-techniques:** [FT1206.001](#ft1206001), [FT1206.002](#ft1206002)

Fraudster returns merchandise to a retailer under deceptive circumstances to obtain monetary refunds, store credit, replacement goods, or has somehow extracted value from the merchandise. This technique involves presenting an item at the point of return (altered, incomplete, counterfeit, or previously used) while misrepresenting its condition or origin.

**Mitigations**

- **[FD1013](#fd1013) Item Condition & Tag Checks** — Ensure item is returned with all its components such as packaging, accessories, and documentation in good condition. Verify additional attributes such as weight, general wear and tear. Scuffs on screws Reapplied tape Do not accept returns that are missing components or may be suspicious.
- **[FM1005](#fm1005) Anti-theft Prevention** — Use unique serial numbers or RFID tags tied to the original transaction record. Verify serial numbers / digital product IDs upon return. Apply tamper-proof seals or packaging that are difficult to replicate.
- **[FM1015](#fm1015) Return Limit** — Require original packaging in return policy for high-value items. Shorten return windows for high-risk categories (electronics, luxury goods). Deny returns to guests or tenders with a history of abuse or suspected abuse.
- **[FM1203](#fm1203) Proof of Purchase** — Require receipts and ID for high-value returns.
- **[FM1009](#fm1009) Restocking Fees** — Charge fees for high-risk categories.
- **[FM1006](#fm1006) Training and Awareness** — Train associates to identify mismatched logos, misspelled labels, or damaged packaging.
- **[FM1022](#fm1022) Escalation** — Implement escalation paths for suspicious returns.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction Data** — Match returned product identifiers (IMEI, serial, RFID) to the original purchase record.
- **[FD1003](#fd1003) Behavioral Attributes** — Profiles or tenders with high rates of returns in specific categories.
- **[FD1005](#fd1005) Device Attributes** — Use graph or link analysis to find connected devices, IPs, or payment tenders and label them as suspicious for future tracking.
- **[FD1009](#fd1009) Online Identities** — Use graph or link analysis to find connected accounts.

**References**

- Appriss
- <https://apprissretail.com/blog/8-common-types-of-return-fraud/>
- Industry Partner Collaboration

### Item Manipulation: Harvesting | FT1206.001

<a id="ft1206001"></a>

**Tactic(s):** Control · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** Return Fraud

**Sub-technique of:** [FT1206](#ft1206)

Fraudster harvests valuable components of an item and returns the merchandise for a full refund.

For example, a fraudster purchases a computer. They harvest valuable components such as the graphics processor and CPU. They then return the item to the store and receive full value of the purchase but have stolen the components.

Another example: A fraudster purchases a console system that comes with redeemable points or other single use credit that is meant for the purchaser. They steal and redeem this credit then return the console for full value.

**Mitigations**

- **[FD1013](#fd1013) Item Condition & Tag Checks** — Ensure item is returned with all its components such as packaging, accessories, and documentation in good condition. Verify additional attributes such as weight, general wear and tear. Scuffs on screws Reapplied tape Do not accept returns that are missing components or may be suspicious.
- **[FM1005](#fm1005) Anti-theft Prevention** — Apply tamper-proof seals or packaging that are difficult to replicate.
- **[FM1009](#fm1009) Restocking Fees** — Charge fees for high-risk categories.

**Detection opportunities**

- **[FD1003](#fd1003) Behavioral Attributes** — Profiles or tenders with high rates of returns in specific categories.

**References**

- Industry Partner Collaboration

### Item Manipulation: Switch Merchandise | FT1206.002

<a id="ft1206002"></a>

**Tactic(s):** Control · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** Return Fraud

**Sub-technique of:** [FT1206](#ft1206)

A fraudster returns a different item, a broken item, or a counterfeit item for resources such as gift cards, store credit, or cash.

For example, a fraudster may purchase an item they already own that is broken. They then keep the new merchandise and put the broken item into the box of the new purchase. They return the broken item for full monetary value.

Another example is that a fraudster may purchase an item online, begin an online return and ship a different item, or other material that is similar in weight or size. The fraudster then keeps the purchased item and receives monetary value of the returned item.

**Mitigations**

- **[FM1005](#fm1005) Anti-theft Prevention** — Use unique serial numbers or RFID tags tied to the original transaction record. Verify serial numbers / digital product IDs upon return. Apply tamper-proof seals or packaging that are difficult to replicate.
- **[FM1015](#fm1015) Return Limit** — Require original packaging in return policy for high-value items. Shorten return windows for high-risk categories (electronics, luxury goods). Deny returns to guests or tenders with a history of abuse or suspected abuse.
- **[FM1203](#fm1203) Proof of Purchase** — Require receipts and ID for high-value returns.
- **[FM1009](#fm1009) Restocking Fees** — Charge fees for returning high-risk categories.
- **[FM1006](#fm1006) Training and Awareness** — Train associates to identify mismatched logos, misspelled labels or damaged packaging.
- **[FM1022](#fm1022) Escalation** — Implement Escalation paths for suspicious returns.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction Data** — Match returned product identifiers (IMEI, serial, RFID) to the original purchase record.
- **[FD1003](#fd1003) Behavioral Attributes** — Identify accounts or tenders with repeated returns in high-counterfeit categories.
- **[FD1005](#fd1005) Device Attributes** — Use graph or link analysis to find connected devices, IP addresses, or payment tenders and label them as suspicious for future tracking.
- **[FD1009](#fd1009) Online Identities** — Use graph or link analysis to find connected accounts.

**References**

- Industry Partner Collaboration

### Returns Process Exploitation | FT1207

<a id="ft1207"></a>

**Tactic(s):** Control · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** Return Fraud

**Sub-techniques:** [FT1207.001](#ft1207001), [FT1207.002](#ft1207002)

A fraudster abuses a retailer’s returns system to receive the value of an item. They may claim an item is damaged or never arrived.

For example, a fraudster purchases an item and has it delivered to their house. Though the merchandise arrived, they fraudulently claim the item has never arrived or was damaged in transit. They abuse the retailer’s claims system to receive a refund as well as keeping the delivered item.

**Mitigations**

- **[FM1008](#fm1008) Behavior Prevention** — Flag customers that make too many returns and delay or deny returns.
- **[FM1009](#fm1009) Restocking Fees** — Impose a fee for returns.
- **[FM1010](#fm1010) Delayed Reimbursement** — Delay reimbursement for a specific amount of time or until the return is verified.
- **[FM1203](#fm1203) Proof of Purchase** — Require proof of purchase such as a receipt before permitting return.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction Data** — Record serial numbers to make sure refunds match the product.
- **[FD1003](#fd1003) Behavioral Attributes** — Identify fraudsters that make repeat or frequent returns. Identify fraudsters attempting to refund online and in stores.
- **[FD1005](#fd1005) Device Attributes** — Identify devices such as a single phone or computer used for many return attempts.

**References**

- RSP Memorandum
- Industry Partner Collaboration

### Returns Process Exploitation: Shipping Manipulation | FT1207.001

<a id="ft1207001"></a>

**Tactic(s):** Control · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** Return Fraud

**Sub-technique of:** [FT1207](#ft1207)

Fraudster purchases an item with the intent to return the item. They request a return from the retailer and tamper with the return label, resulting in a lost package. The fraudster does not return the original item, but an item with similar weight and size. The retailer in good faith refunds the fraudster as soon as the return is initiated. The fraudster now possesses the merchandise as well as the value of the refund.

**Mitigations**

- **[FM1204](#fm1204) Delivery Confirmation** — Only refund after the item is received and verified.
- **[FM1008](#fm1008) Behavior Prevention** — Flag customers that make too many returns and delay or deny returns.
- **[FM1015](#fm1015) Return Limit** — Restrict fast refunds on high-risk items like electronics.
- **[FM1010](#fm1010) Delayed Reimbursement** — Delay reimbursement for a specific amount of time or until the return is verified.

**Detection opportunities**

- **[FD1003](#fd1003) Behavioral Attributes** — Identify fraudsters that make repeat or frequent delivery-based returns.
- **[FD1010](#fd1010) Transaction Data** — Match refund claims with shipping records.
- **[FD1005](#fd1005) Device Attributes** — Identify devices such as a single phone or computer used for many return attempts.

**References**

- Appriss
- <https://apprissretail.com/blog/8-common-types-of-return-fraud/>
- Industry Partner Collaboration

### Returns Process Exploitation: Damaged Shipment | FT1207.002

<a id="ft1207002"></a>

**Tactic(s):** Control · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** Return Fraud

**Sub-technique of:** [FT1207](#ft1207)

A fraudster orders multiple items in one shipment and then falsely claims that damage to one item rendered the entire order unusable (e.g., leakage, shattered glass, food contamination). They request an order-level refund or reshipment rather than a partial remedy, exploiting lenient damage policies and limited evidence requirements.

One example is when a fraudster orders printer ink, toner and a laptop, then claims the toner exploded during shipping and damaged the laptop. The fraudster requests a refund for all items while keeping them.

**Mitigations**

- **[FM1205](#fm1205) Proof of Damage** — Require customers to submit photos or video evidence of damage. Require the physical return of damaged goods before issuing a refund.
- **[FM1206](#fm1206) Enhanced Packaging** — Isolate items that could leak or cause contamination into separate packages. Use waterproof packaging or tamper-proof seals.
- **[FM1015](#fm1015) Return Limit** — Limit the amount that can be refunded without requiring the item to be physically returned.

**Detection opportunities**

- **[FD1003](#fd1003) Behavioral Attributes** — Flag customers with repeated claims tied to specific accounts, addresses, and/or payment identities. Monitor for claims made on first-time orders by new customers.
- **[FD1006](#fd1006) Velocity Attributes** — Monitor for frequent damage claims of specific items.

**References**

- Industry Partner Collaboration

### Wardrobing | FT1209

<a id="ft1209"></a>

**Tactic(s):** Control · **Channel(s):** Analog | Digital · **Scheme(s):** Return Fraud

A fraudster buys merchandise (often apparel, footwear, or accessories) intending to temporarily use or wear the item for an event, photo shoot, or short-term need. After use, the fraudster returns the item, exploiting return policies. The retailer incurs losses through inventory depreciation, sanitation costs, and resale markdowns, as returned items often cannot be sold as new.

For example, a fraudster has an upcoming special event such as a wedding. They purchase expensive dresses, jewelry, and other accessories with no intent of keeping them. After they wear the merchandise to their event, they return the items to the store for a refund.

**Mitigations**

- **[FM1015](#fm1015) Return Limit** — Deny returns on worn, washed, or tag-removed items. Shorten return windows for seasonal / fashion merchandise.
- **[FM1009](#fm1009) Restocking Fees** — Apply Restocking Fees to high-value apparel items.

**Detection opportunities**

- **[FD1006](#fd1006) Velocity Attributes** — Profiles or tenders with high rates of returns in specific categories.
- **[FD1013](#fd1013) Item Condition & Tag Checks** — Inspect the item being returned for missing original packaging, tags, or signs of use (stains, scuffs).
- **[FM1005](#fm1005) Anti-theft Prevention** — Use tamper-proof tagging that would leave a detectable residue that the item has been worn. RFID tagging to validate item being returned was purchased within the return window (prevents purchasing a new item and returning old).

**References**

- Industry Partner Collaboration

### Resale | FT1301

<a id="ft1301"></a>

**Tactic(s):** Monetization · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** Gift Card Fraud

**Sub-techniques:** [FT1301.001](#ft1301001), [FT1301.002](#ft1301002)

The fraudster exchanges the illicitly obtained items or gift cards with another person or organization in exchange for liquid funds.

For example, a fraudster may steal jewelry worth $100. Using a third party market such as Facebook Marketplace, they sell the illicitly obtained jewelry for $80, converting the item to currency the fraudster controls.

**Mitigations**

- **[FM1001](#fm1001) Primary Gift Card Lock in** — For gift cards, lock the gift card into the identity of the purchaser. Do not allow another person to use the gift card without identity verification or authentication.
- **[FM1002](#fm1002) Login Required** — For gift cards, require an account before permitting purchase of or transfer.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction Data** — Monitor for anomalous purchases of easily monetized items such as Electronics, and Luxury Goods.

**References**

- Detecting and Reporting the Illicit Financial Flows Tied to Organized Theft Groups (OTG) and Organized Retail Crime (ORC)
- <https://www.acams.org/en/media/document/29436>

### Resale: Drop Shipping | FT1301.001

<a id="ft1301001"></a>

**Tactic(s):** Monetization · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** Gift Card Fraud

**Sub-technique of:** [FT1301](#ft1301)

The fraudster will use a third party to ship directly to a customer.

For example, to obfuscate the legitimacy of the gift card, the fraudster will store gift cards with a third-party partner who will list and manage their gift cards. A buyer will purchase the gift card from the third party. The buyer will receive illegally obtained gift cards.

**Mitigations**

- **[FM1001](#fm1001) Primary Gift Card Lock in** — For gift cards, lock the gift card into the identity of the purchaser. Do not allow another person to use the gift card without identity verification or authentication.
- **[FM1002](#fm1002) Login Required** — For gift cards, require an account before permitting purchase of or transfer.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction data** — Monitor for anomalous purchases of easily monetized items such as Electronics and Luxury Goods.

**References**

- Detecting and Reporting the Illicit Financial Flows Tied to Organized Theft Groups (OTG) and Organized Retail Crime (ORC)
- <https://www.acams.org/en/media/document/29436>

### Resale: Unwitting Buyer | FT1301.002

<a id="ft1301002"></a>

**Tactic(s):** Monetization · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** All

**Sub-technique of:** [FT1301](#ft1301)

The fraudster sells the illicitly obtained goods or resources to an unwitting buyer.

**Mitigations**

- **[FM1001](#fm1001) Primary Gift Card Lock in** — For gift cards, lock the gift card into the identity of the purchaser. Do not allow another person to use the gift card without identity verification or authentication.
- **[FM1002](#fm1002) Login Required** — For gift cards, require an account before permitting purchase of or transfer.

**Detection opportunities**

- **[FD1011](#fd1011) Market Resale Data** — Monitor for anomalous sales of serialized items and gift cards in third party locations and other repositories.

**References**

- Detecting and Reporting the Illicit Financial Flows Tied to Organized Theft Groups (OTG) and Organized Retail Crime (ORC)
- <https://www.acams.org/en/media/document/29436>

### Marketplace Exploitation | FT1302

<a id="ft1302"></a>

**Tactic(s):** Control · **Channel(s):** Analog | Digital · **Scheme(s):** Return Fraud

**Sub-techniques:** [FT1302.001](#ft1302001), [FT1302.002](#ft1302002)

Fraudulent sellers pose as legitimate marketplace accounts and exploit drop shipping to shift financial loss and reputational damage onto retailers.

These sellers may deliver counterfeit, damaged, or no goods at all, causing customers to request refunds or initiate chargebacks, which the retailer absorbs.

Fraudsters often use stolen payment methods, fake or nonexistent addresses, and may intercept packages or “double dip” by keeping goods while claiming non-delivery. This tactic enables criminals to convert illicit funds into legitimate cash while leaving retailers with monetary losses, operational burdens, and customer dissatisfaction.

**Mitigations**

- **[FM1204](#fm1204) Delivery Confirmation** — Only refund after the item is received and verified.
- **[FM1008](#fm1008) Behavior Prevention** — Validate address is legitimate and do not deliver to unlisted addresses.
- **[FM1211](#fm1211) Blacklist Known High-Risk Addresses** — Maintain a blacklist of shipping and billing addresses tied to prior fraud, freight forwarders, or reshipping operations, and block or hold orders directed to them.
- **[FM1212](#fm1212) Require Signature on Delivery** — Require signature confirmation at delivery for high-value or high-risk orders to establish proof of receipt and counter fraudulent non-delivery claims.

**Detection opportunities**

- **[FD1007](#fd1007) Network Traffic Attributes** — Identify mismatch between Network Traffic Attributes such as IP geo location against the billing and shipping address.
- **[FD1016](#fd1016) Location Attributes** — Identify mismatch between billing and shipping address.
- **[FD1003](#fd1003) Behavioral Attributes** — Refund returns only to the method of purchase.

**References**

- Industry Partner Collaboration

### Marketplace Exploitation: Fraudulent Delivery | FT1302.001

<a id="ft1302001"></a>

**Tactic(s):** Control · **Channel(s):** Analog | Digital · **Scheme(s):** Return Fraud

**Sub-technique of:** [FT1302](#ft1302)

The fraudster places an order using a fraudulent, fake, incorrect, or nonexistent shipping address. This could be, but is not limited to: a fake street number, a real street but non-existent apartment number, an abandoned property, or a vacant lot. The fraudster may use stolen credit cards or other illicit resources to pay for the item.

If the item is successfully delivered, the fraudster may steal the item from the real, but fraudulent location or a consolidated mailroom such as an apartment, business, or delivery service.

The fraudster may attempt to intercept the item from the delivery service to gain control of the item.

The fraudster may “double dip” and intercept the package to keep the goods and claim non-delivery.

**Mitigations**

- **[FM1204](#fm1204) Delivery Confirmation** — Only refund after the item is received and verified.
- **[FM1008](#fm1008) Behavior Prevention** — Validate address is legitimate and do not deliver to unlisted addresses.
- **[FM1211](#fm1211) Blacklist Known High-Risk Addresses** — Maintain a blacklist of shipping and billing addresses tied to prior fraud, freight forwarders, or reshipping operations, and block or hold orders directed to them.
- **[FM1212](#fm1212) Require Signature on Delivery** — Require signature confirmation at delivery for high-value or high-risk orders to establish proof of receipt and counter fraudulent non-delivery claims.

**Detection opportunities**

- **[FD1007](#fd1007) Network Traffic Attributes** — Identify mismatch between Network Traffic Attributes such as IP geo location against the billing and shipping address.
- **[FD1016](#fd1016) Location Attributes** — Identify mismatch between billing and shipping address.
- **[FD1003](#fd1003) Behavioral Attributes** — Refund returns only to the method of purchase.

**References**

- Industry Partner Collaboration

### Marketplace Exploitation: Fraudulent Seller | FT1302.002

<a id="ft1302002"></a>

**Tactic(s):** Control · **Channel(s):** Analog | Digital · **Scheme(s):** Return Fraud

**Sub-technique of:** [FT1302](#ft1302)

A fraudulent seller is an account operating on (or connected to) your storefront/marketplace that appears legitimate but uses drop shipping to execute scams that shift loss, reputational damage, and chargebacks onto your retail brand.

A legitimate customer may buy an item from the reseller that is counterfeit, damaged, or inferior. This results in the customer returning the item for a full refund of the full cost of a legitimate item. In the event the item does not exist or it is not delivered, the customer will then initiate a refund. Both situations result in the retailer losing money, chargebacks, or returns.

A fraudster may work with the fraudulent seller to purchase the item with stolen funds or other illicit resources. The seller either does not deliver an item or delivers an inferior item, resulting in a return or chargeback. The seller is then able to convert stolen funds into legitimate cash.

**Mitigations**

- **[FM1204](#fm1204) Delivery Confirmation** — Only refund after the item is received and verified.
- **[FM1008](#fm1008) Behavior Prevention** — Do not permit resellers to operate in your ecosystem without legitimate business credentials or sufficient time in market. Validate address is legitimate and do not deliver to unlisted addresses.
- **[FM1211](#fm1211) Blacklist Known High-Risk Addresses** — Maintain a blacklist of shipping and billing addresses tied to prior fraud, freight forwarders, or reshipping operations, and block or hold orders directed to them.
- **[FM1212](#fm1212) Require Signature on Delivery** — Require signature confirmation at delivery for high-value or high-risk orders to establish proof of receipt and counter fraudulent non-delivery claims.
- **[FD1003](#fd1003) Behavioral Attributes** — Refund returns only to the method of purchase.

**Detection opportunities**

- **[FD1006](#fd1006) Velocity Attributes** — Flag sellers with multiple returns or chargebacks.

**References**

- Industry Partner Collaboration

### Checkout | FT1303

<a id="ft1303"></a>

**Tactic(s):** Monetization · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** All

**Sub-techniques:** [FT1303.001](#ft1303001), [FT1303.002](#ft1303002), [FT1303.003](#ft1303003)

The fraudster uses legitimate checkout to redeem or otherwise convert illicit resources into liquid funds.

**Mitigations**

- **[FM1003](#fm1003) Access Code Required** — Require an access code that is separate from the gift card before refunding gift card value.
- **[FM1008](#fm1008) Behavior Prevention** — Identify potentially fraudulent returns and do not refund money if fraud is detected.
- **[FM1009](#fm1009) Restocking Fees** — Require a fee for potentially fraudulent returns.
- **[FM1010](#fm1010) Delayed Reimbursement** — Postpone refund by a predetermined amount of time for items that are commonly related to fraud.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction Data** — Monitor for returns of items commonly related to fraud such as gift cards, Luxury Items, and Electronics for fraudulent activity.

**References**

- Industry Partner Collaboration

### Checkout: Point of Sale | FT1303.001

<a id="ft1303001"></a>

**Tactic(s):** Monetization · **Channel(s):** Analog | Social Engineering · **Scheme(s):** All

**Sub-technique of:** [FT1303](#ft1303)

The fraudster uses the checkout in store to convert illicit resources into liquid funds.

**Mitigations**

- **[FM1003](#fm1003) Access Code Required** — Require an access code that is separate from the gift card before refunding gift card value.
- **[FM1008](#fm1008) Behavior Prevention** — Identify potentially fraudulent returns and do not refund money if fraud is detected.
- **[FM1009](#fm1009) Restocking Fees** — Require a fee for potentially fraudulent returns.
- **[FM1010](#fm1010) Delayed Reimbursement** — Postpone refund by a predetermined amount of time for items that are commonly related to fraud.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction data** — Monitor and record product serial number of items that are commonly related to fraud.
- **[FD1006](#fd1006) Velocity Attributes** — Monitor returns for total amount and total value of items returned.

**References**

- Industry Partner Collaboration

### Checkout: Guest Services | FT1303.002

<a id="ft1303002"></a>

**Tactic(s):** Monetization · **Channel(s):** Analog | Social Engineering · **Scheme(s):** All

**Sub-technique of:** [FT1303](#ft1303)

The fraudster uses the guest services in store to convert illicit resources into liquid funds.

**Mitigations**

- **[FM1003](#fm1003) Access Code Required** — Require an access code that is separate from the gift card before refunding gift card value.
- **[FM1008](#fm1008) Behavior Prevention** — Identify potentially fraudulent returns and do not refund money if fraud is detected.
- **[FM1009](#fm1009) Restocking Fees** — Require a fee for potentially fraudulent returns.
- **[FM1010](#fm1010) Delayed Reimbursement** — Postpone refund by a predetermined amount of time for items that are commonly related to fraud.
- **[FM1006](#fm1006) Training and Awareness** — Train customer service representatives to identify potential fraud situations and deny refund.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction data** — Monitor and record product serial number of items that are commonly related to fraud.
- **[FD1006](#fd1006) Velocity Attributes** — Monitor returns for total amount and total value of items returned.

**References**

- Industry Partner Collaboration

### Checkout: Online/Web Mobile | FT1303.003

<a id="ft1303003"></a>

**Tactic(s):** Monetization · **Channel(s):** Digital · **Scheme(s):** All

**Sub-technique of:** [FT1303](#ft1303)

The fraudster uses digital resources to convert illicit resources into liquid funds.

**Mitigations**

- **[FM1209](#fm1209) Online Location Data** — Some physical locations should not be able to return items. Some locations may also be the source of repeated fraud attempts. Prevent the ability to return items for funds based on locations.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction data** — Monitor and record product serial number of items that are commonly related to fraud.
- **[FD1007](#fd1007) Network Traffic Attributes** — Monitor for Network Traffic Attributes such as IP Address, DNS Name, ASN, and other digital location attributes especially if some of these sources have known fraud activity or have a high risk of fraud activity.
- **[FD1004](#fd1004) Time-Based Attributes** — Based on the location of your operations, monitor for activities that occur during off hours.
- **[FD1005](#fd1005) Device Attributes** — Monitor device factors such as device type, user agent string, operating system, cookies.
- **[FD1006](#fd1006) Velocity Attributes** — Monitor for number of requests based on a predetermined number of requests over a set amount of time.

**References**

- Industry Partner Collaboration

### Fraudulent Refund | FT1304

<a id="ft1304"></a>

**Tactic(s):** Monetization · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** Return Fraud

**Sub-techniques:** [FT1304.001](#ft1304001), [FT1304.002](#ft1304002), [FT1304.003](#ft1304003)

Deliberate exploitation of a retailer’s refund process to obtain financial gain or store credit without legitimate grounds. The fraudster initiates a return, often under false pretenses such as claiming damage, misrepresentation, or leveraging policy loopholes, and secures cash refunds, gift cards, or store credit.

**Mitigations**

- **[FM1015](#fm1015) Return Limit** — Link each order to an individual refund. Restrict how many times a refund can be requested per order. Limit the number and total amount of non-receipted returns per customer. Limit the types of items that can be returned without a receipt. Only allow in-store credit or gift cards as a refund tender.
- **[FD1003](#fd1003) Behavioral Attributes** — Stop refunds if the same order ID is already refunded.
- **[FM1022](#fm1022) Escalation** — Escalate suspicious repeat attempts to returns.
- **[FM1021](#fm1021) Identity Verification** — Require government-issued ID. Tie return transaction to customer profile for monitoring.
- **[FM1009](#fm1009) Restocking Fees** — Impose fees on items being returned.
- **[FM1207](#fm1207) Redemption Limits** — Limit the amount of store credit that can be used on a single transaction.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction Data** — Identify multiple refund requests for the same order. Check if item identifiers (IMEI, serial, RFID) can be associated with a prior purchase. Identify the same return in multiple stores and online.
- **[FD1003](#fd1003) Behavioral Attributes** — Flag accounts that are doing frequent gift card refunds. Identify in person or Online Identities attempting gift card refund. Flag accounts attempting frequent non-receipted returns. Monitor for invalid government ID usage. Track items frequently returned without receipts at locations associated with high rates of theft. Compare items against inventory shortage reports.
- **[FD1005](#fd1005) Device Attributes** — Detect repeat attempts from the same computer or phone submitting duplicate requests.
- **[FD1006](#fd1006) Velocity Attributes** — Identify accounts requesting several refunds in a short time.
- **[FD1014](#fd1014) Credit Redemption Behavior** — Monitor for the consolidation of in-store credit gift cards to purchase high-value items or issued to multiple identities (e.g. electronics).

**References**

- Industry Partner Collaboration

### Refund: Refund To Gift Card | FT1304.001

<a id="ft1304001"></a>

**Tactic(s):** Monetization · **Channel(s):** Digital | Social Engineering · **Scheme(s):** Return Fraud

**Sub-technique of:** [FT1304](#ft1304)

Exploiting a retailer’s refund process by requesting that the refund value be issued as a gift card or store credit rather than returned to the original payment method. Fraudsters favor gift cards because they are highly liquid, easily transferable, and often lack the same fraud detection or traceability controls for credit or debit card refunds. Once obtained, these gift cards can be resold on secondary markets, exchanged for cash, or used to purchase high-value goods for sale, effectively converting fraudulent returns into fungible currency.

**Mitigations**

- **[FM1003](#fm1003) Access Code Required** — Require an access code before permitting access to resources.
- **[FM1015](#fm1015) Return Limit** — Limit the amount of money that can be refunded.
- **[FM1022](#fm1022) Escalation** — Based on value require Escalation to manager.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction Data** — Record serial numbers for refunded gift cards.
- **[FD1003](#fd1003) Behavioral Attributes** — Flag accounts doing frequent gift card refunds. Identify in person or Online Identities attempting gift card refund.
- **[FD1005](#fd1005) Device Attributes** — Detect repeat attempts from the same computer or phone.

**References**

- Industry Partner Collaboration

### Refund: Double Refund | FT1304.002

<a id="ft1304002"></a>

**Tactic(s):** Monetization · **Channel(s):** Digital | Social Engineering · **Scheme(s):** Return Fraud

**Sub-technique of:** [FT1304](#ft1304)

Fraudsters refund the same item multiple times either in multiple stores, online or some combination of both.

**Mitigations**

- **[FM1015](#fm1015) Return Limit** — Link each order to an individual refund. Restrict how many times a refund can be requested per order.
- **[FM1022](#fm1022) Escalation** — Escalate repeat attempts to return the same item to manager.
- **[FM1008](#fm1008) Behavior Prevention** — Stop refunds if the same order ID is already refunded.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction Data** — Identify multiple refund requests for the same order. Identify the same return in multiple stores and online.
- **[FD1003](#fd1003) Behavioral Attributes** — Flag accounts doing frequent gift card refunds. Identify in person or Online Identities attempting gift card refund.
- **[FD1005](#fd1005) Device Attributes** — Detect repeat attempts from the same computer or phone submitting duplicate requests.
- **[FD1006](#fd1006) Velocity Attributes** — Identify accounts requesting several refunds in a short time.

**References**

- Industry Partner Collaboration

### Refund: Non-Receipted Returns | FT1304.003

<a id="ft1304003"></a>

**Tactic(s):** Control | Monetization · **Channel(s):** Analog | Digital | Social Engineering · **Scheme(s):** Return Fraud

**Sub-technique of:** [FT1304](#ft1304)

Fraudster intentionally misuses the returns process without a valid receipt (or other proof of purchase) to obtain cash refunds, store credit, gift cards, or replacements. The actor exploits no receipt allowances, low evidence thresholds, and minimal inspection.

**Mitigations**

- **[FM1015](#fm1015) Return Limit** — Limit the number and total amount of non-receipted returns per customer. Limit the types of items that can be returned without a receipt. Only allow in-store credit or gift cards as a refund tender.
- **[FM1021](#fm1021) Identity Verification** — Require government-issued ID. Tie return transaction to customer profile for monitoring.
- **[FM1009](#fm1009) Restocking Fees** — Impose fees on items being returned that have no proof of purchase.
- **[FM1207](#fm1207) Redemption Limits** — Limit the amount of store credit that can be used on a single transaction.

**Detection opportunities**

- **[FD1003](#fd1003) Behavioral Attributes** — Flag accounts attempting frequent non-receipted returns. Monitor for invalid government ID usage. Track items frequently returned without receipts at locations associated with high rates of theft. Compare against inventory shortage reports.
- **[FD1010](#fd1010) Transaction Data** — Check if item identifiers (IMEI, serial, RFID) can be associated with a prior purchase.
- **[FD1014](#fd1014) Credit Redemption Behavior** — Monitor for the consolidation of in-store credit gift cards to purchase high value items or issued to multiple identities (e.g. electronics).

**References**

- Industry Partner Collaboration

### VOIP Abuse | FT1401

<a id="ft1401"></a>

**Tactic(s):** Defense Evasion · **Channel(s):** Digital · **Scheme(s):** Return Fraud | Gift Card Fraud | Account Takeover

Fraudsters leverage Voice over Internet Protocol (VOIP) services to mask or manipulate their true geographic location and identity during fraudulent transactions. By using VOIP numbers, they can appear to originate from a trusted region or local area, even when operating from a completely different country or jurisdiction. This tactic is designed to evade fraud detection systems that rely on phone number validation, geolocation checks, or call-back verification. These numbers may also be used on seemingly normal account creations.

**Mitigations**

- **[FM1008](#fm1008) Behavior Prevention** — Do not permit registration of VOIP numbers on accounts or other customer resources.

**Detection opportunities**

- **[FD1008](#fd1008) VOIP Attribute** — Identify VOIP phone usage and correlate against customer profile. Identify high-risk VOIP numbers or multiple accounts with the same VOIP number in your database.

**References**

- Industry Partner Collaboration

### Digital Wallet Apps | FT1402

<a id="ft1402"></a>

**Tactic(s):** Defense Evasion · **Channel(s):** Analog | Digital · **Scheme(s):** Return Fraud | Gift Card Fraud

Digital wallet applications (such as Apple Pay, Google Pay, and PayPal) are mobile or web-based platforms that store payment credentials and enable electronic transactions without physical cards. Fraudsters exploit these wallets to evade detection by creating multiple accounts under different identities, masking the original payment source, and requesting refunds to wallet balances instead of the original payment method, making it easier to convert funds into cash, gift cards, or resale value. In addition, fraudsters may load stolen credit, debit and gift cards onto the wallet for reuse.

**Mitigations**

- **[FM1021](#fm1021) Identity Verification** — Verify the person’s identity matches what is on the card in the wallet.
- **[FM1008](#fm1008) Behavior Prevention** — Do not permit multiple use of the same credit, debit, or gift cards within a defined period.

**Detection opportunities**

- **[FD1016](#fd1016) Location Attributes** — Identify impossible travel transactions for the same credit, debit, or gift card.

**References**

- Industry Partner Collaboration

### Cryptocurrency | FT1403

<a id="ft1403"></a>

**Tactic(s):** Defense Evasion | Control | Monetization · **Channel(s):** Digital · **Scheme(s):** Return Fraud

Fraudsters in retail exploit cryptocurrency as a tool to hide their tracks and bypass traditional fraud controls. After committing fraud or policy abuse, they often convert refunds or store credits into crypto through gift cards, prepaid instruments, or resale of goods on secondary markets. Crypto’s anonymity, lack of centralized oversight, and irreversible transactions make it ideal for laundering value obtained from fraudulent returns. Fraudsters also use multiple wallets, peer-to-peer exchanges, and privacy coins to fragment and obscure transaction history. This enables them to quickly move value across borders and outside retailer monitoring systems, making detection and recovery extremely difficult.

**Mitigations**

- **[FM1021](#fm1021) Identity Verification** — Positively verify the identity of the customer.
- **[FM1008](#fm1008) Behavior Prevention** — Do not accept Cryptocurrency in your marketplace.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction data** — Use CTI to correlate and identify crypto wallets that are either suspicious or have been identified as supporting illegal activity or fraud.

**References**

- Industry Partner Collaboration

### Gift Cards as Defense Evasion | FT1404

<a id="ft1404"></a>

**Tactic(s):** Defense Evasion · **Channel(s):** Analog | Digital · **Scheme(s):** Return Fraud

Commonly exploited in fraud schemes due to their anonymity, liquidity, and ease of transfer. Fraudsters use them to bypass traditional detection systems by converting stolen funds or merchandise into gift card balances, which are harder to trace.

**Mitigations**

- **[FM1001](#fm1001) Primary Gift Card Lock in** — For gift cards, lock the gift card into the identity of the purchaser. Do not allow another person to use the gift card without identity verification or authentication.
- **[FM1002](#fm1002) Login Required** — For gift cards, require an account before permitting purchase of or transfer.

**Detection opportunities**

- **[FD1010](#fd1010) Transaction Data** — Identify suspicious purchases of commonly resold items with potentially illicitly obtained gift cards.

**References**

- Detecting and Reporting the Illicit Financial Flows Tied to Organized Theft Groups (OTG) and Organized Retail Crime (ORC)
- <https://www.acams.org/en/media/document/29436>
- Industry Partner Collaboration

---

## Mitigations

### Primary Gift Card Lock In | FM1001

<a id="fm1001"></a>

Ensure the purchaser is the only person that can monetize the gift card.

**Techniques mitigated (7)**

- [FT1102](#ft1102) Gift Card Extortion — When a gift card is purchased, lock the gift card into the identity of the purchaser. Do not allow another person to use the gift card without identity verification or authentication.
- [FT1203](#ft1203) Gift Card Tampering — For gift cards, lock the Gift Card into the identity of the purchaser. Do not allow another person to use the gift card without identity verification or authentication.
- [FT1204](#ft1204) Gift Card Redemption — For gift cards, lock the gift card into the identity of the purchaser. Do not allow another person to use the gift card without identity verification or authentication.
- [FT1301](#ft1301) Resale — For gift cards, lock the gift card into the identity of the purchaser. Do not allow another person to use the gift card without identity verification or authentication.
- [FT1301.001](#ft1301001) Resale: Drop Shipping — For gift cards, lock the gift card into the identity of the purchaser. Do not allow another person to use the gift card without identity verification or authentication.
- [FT1301.002](#ft1301002) Resale: Unwitting Buyer — For gift cards, lock the gift card into the identity of the purchaser. Do not allow another person to use the gift card without identity verification or authentication.
- [FT1404](#ft1404) Gift Cards as Defense Evasion — For gift cards, lock the gift card into the identity of the purchaser. Do not allow another person to use the gift card without identity verification or authentication.

### Login Required | FM1002

<a id="fm1002"></a>

Ensure a resource is tied to an authentication source before allowing activation, use or transfer.

**Techniques mitigated (10)**

- [FT1102](#ft1102) Gift Card Extortion — Require an account before permitting purchase of or transfer of a gift card.
- [FT1103](#ft1103) Check Gift Card Balance — Require authentication before displaying gift card status or value.
- [FT1103.001](#ft1103001) Check Gift Card Balance: Application — Require authentication before displaying gift card status or value.
- [FT1202](#ft1202) Gift Card Merge — Require authentication before permitting transfer of gift card value.
- [FT1203](#ft1203) Gift Card Tampering — For gift cards, require an account before permitting purchase of or transfer.
- [FT1204](#ft1204) Gift Card Redemption — For gift cards, require an account before permitting purchase of or transfer.
- [FT1301](#ft1301) Resale — For gift cards, require an account before permitting purchase of or transfer.
- [FT1301.001](#ft1301001) Resale: Drop Shipping — For gift cards, require an account before permitting purchase of or transfer.
- [FT1301.002](#ft1301002) Resale: Unwitting Buyer — For gift cards, require an account before permitting purchase of or transfer.
- [FT1404](#ft1404) Gift Cards as Defense Evasion — For gift cards, require an account before permitting purchase of or transfer.

### Access Code Required | FM1003

<a id="fm1003"></a>

Require an access code before permitting access to a resource.

**Techniques mitigated (9)**

- [FT1103](#ft1103) Check Gift Card Balance — Require an access code that is separate from the gift card number before revealing the status and funds on the gift cards.
- [FT1103.001](#ft1103001) Check Gift Card Balance: Application — Require an access code that is separate from the gift card number before revealing the status and funds on the gift cards.
- [FT1103.002](#ft1103002) Check Gift Card Balance: Phone Verification — Require an access code that is separate from the gift card number before revealing the status and funds on the gift cards.
- [FT1103.003](#ft1103003) Verification — Require an access code that is separate from the gift card number before revealing the status and funds on the gift cards.
- [FT1202](#ft1202) Gift Card Merge — Require an access code before permitting transfer of gift card value.
- [FT1303](#ft1303) Checkout — Require an access code that is separate from the gift card before refunding gift card value.
- [FT1303.001](#ft1303001) Checkout: Point of Sale — Require an access code that is separate from the gift card before refunding gift card value.
- [FT1303.002](#ft1303002) Checkout: Guest Services — Require an access code that is separate from the gift card before refunding gift card value.
- [FT1304.001](#ft1304001) Refund: Refund To Gift Card — Require an access code before permitting access to resources.

### Multi-Factor Authentication | FM1004

<a id="fm1004"></a>

This involves requiring two forms of identification, such as a password and a fingerprint or a password and a one-time code sent to a mobile device.

**Techniques mitigated (5)**

- [FT1104](#ft1104) Valid Accounts — Use multiple forms of authentication such as username and password paired with a One-time Passcode before permitting access. Use passkeys linked to a known physical device as authentication factor. Require identity verification upon detection of access requests that are significantly different than what is expected for the individual.
- [FT1104.001](#ft1104001) Valid Accounts: Fraudulent Account — Before permitting account changes, use multiple forms of authentication such as username and password paired with a One-time Passcode before permitting access. If relevant, send confirmatory message to the original contact fields (e.g., original email address, phone number, street address).
- [FT1104.002](#ft1104002) Valid Accounts: Fraudulent Account Update — Use multiple forms of authentication such as username and password paired with a One-time Passcode before permitting access. Require identity verification upon detection of access requests that are significantly different than what is expected for the individual. Send confirmatory message to the original contact fields (e.g., original email address, phone number, street address).
- [FT1104.003](#ft1104003) Valid Accounts: Authorized Account Abuse — Before permitting account changes, use multiple forms of authentication such as username and password paired with a One-time Passcode before permitting access. If relevant, send confirmatory message to the original contact fields (e.g., original email address, phone number, street address).
- [FT1205](#ft1205) Loyalty Points Abuse — Use multiple forms of authentication such as username and password paired with a One-time Passcode before permitting access. Require identity verification upon detection of access requests that are significantly different than what is expected for the individual.

### Anti-Theft Prevention | FM1005

<a id="fm1005"></a>

Additional physical protection of products from theft (e.g. locked shelving, containers, vending machines, storing items behind checkout counter, etc.).

**Techniques mitigated (6)**

- [FT1101](#ft1101) Shoplifting — Additional physical protection of products from theft such as locked shelving, containers, and vending machines, and storing items behind checkout counter.
- [FT1203](#ft1203) Gift Card Tampering — Store gift cards behind checkout counter to limit theft.
- [FT1206](#ft1206) Item Manipulation — Use unique serial numbers or RFID tags tied to the original transaction record. Verify serial numbers / digital product IDs upon return. Apply tamper-proof seals or packaging that are difficult to replicate.
- [FT1206.001](#ft1206001) Item Manipulation: Harvesting — Apply tamper-proof seals or packaging that are difficult to replicate.
- [FT1206.002](#ft1206002) Item Manipulation: Switch Merchandise — Use unique serial numbers or RFID tags tied to the original transaction record. Verify serial numbers / digital product IDs upon return. Apply tamper-proof seals or packaging that are difficult to replicate.
- [FT1209](#ft1209) Wardrobing — Use tamper-proof tagging that would leave a detectable residue that the item has been worn. RFID tagging to validate item being returned was purchased within the return window (prevents purchasing a new item and returning old).

### Training and Awareness | FM1006

<a id="fm1006"></a>

The fraudster uses digital resources to convert illicit resources into liquid funds.

**Techniques mitigated (8)**

- [FT1001](#ft1001) Reconnaissance — At physical locations, training employees to identify and report suspicious individuals to security.
- [FT1009](#ft1009) Fake Receipt Generation — Identify fake receipts, which may appear visually different.
- [FT1010](#ft1010) Insider Recruitment — Train employees to recognize recruitment attempts and remind them of their role, ethical agreements, and consequences.
- [FT1011](#ft1011) Impersonation Of Retail Employee — Train employees in stores to recognize impersonation attempts, posing as an employee, someone from headquarters, or a legitimate third party such as contractors.
- [FT1102](#ft1102) Gift Card Extortion — Consumer fraud awareness and education campaigns, signage, pop-ups, and other forms of communication.
- [FT1206](#ft1206) Item Manipulation — Train associates to identify mismatched logos, misspelled labels, or damaged packaging.
- [FT1206.002](#ft1206002) Item Manipulation: Switch Merchandise — Train associates to identify mismatched logos, misspelled labels or damaged packaging.
- [FT1303.002](#ft1303002) Checkout: Guest Services — Train customer service representatives to identify potential fraud situations and deny refund.

### Website Takedown Requests | FM1007

<a id="fm1007"></a>

A formal request to a website owner, service provider, or domain registrar to remove an offending website.

**Techniques mitigated (1)**

- [FT1003](#ft1003) Fake Pages — When a fake page is identified file a takedown request with the Website Host and DNS Registrar.

### Behavior Prevention | FM1008

<a id="fm1008"></a>

Use capabilities to prevent suspicious behavior patterns from occurring on various systems.

**Techniques mitigated (17)**

- [FT1007](#ft1007) Proxy Abuse — Block traffic from known proxies, TOR 7exit nodes and infected machines.
- [FT1009](#ft1009) Fake Receipt Generation — Validate the receipt with store records (preferably by electronic scan). Do not permit use of receipts without validation of store-controlled records.
- [FT1103.002](#ft1103002) Check Gift Card Balance: Phone Verification — Automatically block phone numbers related to VOIP services and phone numbers that have been known to be used to perpetrate fraud.
- [FT1105](#ft1105) Credential Stuffing — Many commercial services provide bot detection and mitigation, often incorporated into content delivery networks and other management packages. Commonly available tooling includes default technical indicators which should be mitigated at the edge and automatically denied.
- [FT1202](#ft1202) Gift Card Merge — Do not permit merging of gift cards.
- [FT1207](#ft1207) Returns Process Exploitation — Flag customers that make too many returns and delay or deny returns.
- [FT1207.001](#ft1207001) Returns Process Exploitation: Shipping Manipulation — Flag customers that make too many returns and delay or deny returns.
- [FT1302](#ft1302) Marketplace Exploitation — Validate address is legitimate and do not deliver to unlisted addresses.
- [FT1302.001](#ft1302001) Marketplace Exploitation: Fraudulent Delivery — Validate address is legitimate and do not deliver to unlisted addresses.
- [FT1302.002](#ft1302002) Marketplace Exploitation: Fraudulent Seller — Do not permit resellers to operate in your ecosystem without legitimate business credentials or sufficient time in market. Validate address is legitimate and do not deliver to unlisted addresses.
- [FT1303](#ft1303) Checkout — Identify potentially fraudulent returns and do not refund money if fraud is detected.
- [FT1303.001](#ft1303001) Checkout: Point of Sale — Identify potentially fraudulent returns and do not refund money if fraud is detected.
- [FT1303.002](#ft1303002) Checkout: Guest Services — Identify potentially fraudulent returns and do not refund money if fraud is detected.
- [FT1304.002](#ft1304002) Refund: Double Refund — Stop refunds if the same order ID is already refunded.
- [FT1401](#ft1401) VOIP Abuse — Do not permit registration of VOIP numbers on accounts or other customer resources.
- [FT1402](#ft1402) Digital Wallet Apps — Do not permit multiple use of the same credit, debit, or gift cards within a defined period.
- [FT1403](#ft1403) Cryptocurrency — Do not accept Cryptocurrency in your marketplace.

### Restocking Fees | FM1009

<a id="fm1009"></a>

Impose a fee for product returns.

**Techniques mitigated (10)**

- [FT1206](#ft1206) Item Manipulation — Charge fees for high-risk categories.
- [FT1206.001](#ft1206001) Item Manipulation: Harvesting — Charge fees for high-risk categories.
- [FT1206.002](#ft1206002) Item Manipulation: Switch Merchandise — Charge fees for returning high-risk categories.
- [FT1207](#ft1207) Returns Process Exploitation — Impose a fee for returns.
- [FT1209](#ft1209) Wardrobing — Apply Restocking Fees to high-value apparel items.
- [FT1303](#ft1303) Checkout — Require a fee for potentially fraudulent returns.
- [FT1303.001](#ft1303001) Checkout: Point of Sale — Require a fee for potentially fraudulent returns.
- [FT1303.002](#ft1303002) Checkout: Guest Services — Require a fee for potentially fraudulent returns.
- [FT1304](#ft1304) Fraudulent Refund — Impose fees on items being returned.
- [FT1304.003](#ft1304003) Refund: Non-Receipted Returns — Impose fees on items being returned that have no proof of purchase.

### Delayed Reimbursement | FM1010

<a id="fm1010"></a>

Delay return reimbursement for a predetermined amount of time.

**Techniques mitigated (5)**

- [FT1207](#ft1207) Returns Process Exploitation — Delay reimbursement for a specific amount of time or until the return is verified.
- [FT1207.001](#ft1207001) Returns Process Exploitation: Shipping Manipulation — Delay reimbursement for a specific amount of time or until the return is verified.
- [FT1303](#ft1303) Checkout — Postpone refund by a predetermined amount of time for items that are commonly related to fraud.
- [FT1303.001](#ft1303001) Checkout: Point of Sale — Postpone refund by a predetermined amount of time for items that are commonly related to fraud.
- [FT1303.002](#ft1303002) Checkout: Guest Services — Postpone refund by a predetermined amount of time for items that are commonly related to fraud.

### Brute Force Resistant Gift Card Numbers | FM1011

<a id="fm1011"></a>

Using algorithms to generate long and complicated gift card numbers that are resistant to prediction.

**Techniques mitigated (1)**

- [FT1005](#ft1005) Gift Card Number Generation — Generate long and complicated gift card numbers that are resistant to prediction.

### Gift Card Purchase Limit | FM1012

<a id="fm1012"></a>

Enforce limits of quantity and/or the value that may be purchased by an interaction or person.

**Techniques mitigated (1)**

- [FT1102](#ft1102) Gift Card Extortion — Enforce limits of quantity and/or the value that may be purchased by an interaction or person.

### DNS Registration | FM1013

<a id="fm1013"></a>

Identify potential URLs that may be used to fool individuals and register them to your organization.

**Techniques mitigated (1)**

- [FT1003](#ft1003) Fake Pages — Identify potential URLs that may be mistaken for the legitimate website and register them so they cannot be used by fraudsters.

### Password Policy | FM1014

<a id="fm1014"></a>

Enforce strong passwords with length and complexity requirements.

**Techniques mitigated (3)**

- [FT1004](#ft1004) Acquire Database — Encourage using strong passwords with sufficient length and complexity. Discourage reusing passwords.
- [FT1104](#ft1104) Valid Accounts — Encourage using strong passwords with sufficient length and complexity. Discourage reusing passwords.
- [FT1205](#ft1205) Loyalty Points Abuse — Encourage using strong passwords with sufficient length and complexity. Discourage reusing passwords.

### Return Limit | FM1015

<a id="fm1015"></a>

Do not allow returns over a specified amount.

**Techniques mitigated (10)**

- [FT1201](#ft1201) Gift Card Return — Do not exchange gift cards over a pre-determined value.
- [FT1206](#ft1206) Item Manipulation — Require original packaging in return policy for high-value items. Shorten return windows for high-risk categories (electronics, luxury goods). Deny returns to guests or tenders with a history of abuse or suspected abuse.
- [FT1206.002](#ft1206002) Item Manipulation: Switch Merchandise — Require original packaging in return policy for high-value items. Shorten return windows for high-risk categories (electronics, luxury goods). Deny returns to guests or tenders with a history of abuse or suspected abuse.
- [FT1207.001](#ft1207001) Returns Process Exploitation: Shipping Manipulation — Restrict fast refunds on high-risk items like electronics.
- [FT1207.002](#ft1207002) Returns Process Exploitation: Damaged Shipment — Limit the amount that can be refunded without requiring the item to be physically returned.
- [FT1209](#ft1209) Wardrobing — Deny returns on worn, washed, or tag-removed items. Shorten return windows for seasonal / fashion merchandise.
- [FT1304](#ft1304) Fraudulent Refund — Link each order to an individual refund. Restrict how many times a refund can be requested per order. Limit the number and total amount of non-receipted returns per customer. Limit the types of items that can be returned without a receipt. Only allow in-store credit or gift cards as a refund tender.
- [FT1304.001](#ft1304001) Refund: Refund To Gift Card — Limit the amount of money that can be refunded.
- [FT1304.002](#ft1304002) Refund: Double Refund — Link each order to an individual refund. Restrict how many times a refund can be requested per order.
- [FT1304.003](#ft1304003) Refund: Non-Receipted Returns — Limit the number and total amount of non-receipted returns per customer. Limit the types of items that can be returned without a receipt. Only allow in-store credit or gift cards as a refund tender.

### Security Guard | FM1016

<a id="fm1016"></a>

A person charged with safeguarding the premises, protecting assets, preventing theft, and ensuring the safety of both customers and staff. Their duties typically include monitoring surveillance equipment, patrolling the retail space, managing access points, responding to emergencies, and sometimes assisting in loss prevention strategies. Security guards help deter shoplifting and vandalism, maintain order within the store, and contribute to creating a secure shopping environment. They may also be involved in checking receipts, managing crowd control during peak times or special events, and coordinating with law enforcement when necessary.

**Techniques mitigated (3)**

- [FT1001](#ft1001) Reconnaissance — At physical locations, use a security guard to identify and deter reconnaissance attempts.
- [FT1101](#ft1101) Shoplifting — At physical locations, use security guards to identify and deter shoplifting.
- [FT1203](#ft1203) Gift Card Tampering — At physical locations, use security guards to identify instances of fraudsters stealing gift cards and/or returning tampered gift cards.

### Satchel Control | FM1017

<a id="fm1017"></a>

Control the admittance or size of satchels allowed at the location.

**Techniques mitigated (1)**

- [FT1101](#ft1101) Shoplifting — Control the size and type of satchels that are permitted inside the store.

### Software Configuration | FM1018

<a id="fm1018"></a>

Harden devices with configurations that can mitigate techniques or harden attack surface.

**Techniques mitigated (1)**

- [FT1001](#ft1001) Reconnaissance — Fully decommission obsolete login software that may not be protected by current security protocols. Redirect login requests to obsolete software to follow the approved login flow.

### Neutral Feedback | FM1019

<a id="fm1019"></a>

Adversaries will use return codes from public applications to gather information. When providing automatic feedback for failed requests such as accounts, gift cards, password resets, etc., provide an abstract response that does not confirm or deny that the resource exists.
For Example, if a user requests a password reset, instead of stating that the account exists and an email was sent to the email address on file, instead return “If the account exists, an email will be sent to the address on file.”

**Techniques mitigated (1)**

- [FT1006](#ft1006) Password Reset — Do not provide feedback that notifies an actor if the account exists or does not exist on the website.

### Customer Notification | FM1020

<a id="fm1020"></a>

Send a notification to the original contacts listed on an account or resource when changes are made to the account or resources.
For example, if an address is updated for an account, send an update notification to the email and phone number listed for the resource.

**Techniques mitigated (1)**

- [FT1006](#ft1006) Password Reset — Notify all available contacts on the account when a password is reset.

### Identity Verification | FM1021

<a id="fm1021"></a>

Positively verify identity of customer with government or store credentials.

**Techniques mitigated (5)**

- [FT1011](#ft1011) Impersonation Of Retail Employee — Establish identification and authentication procedures to prove someone is an employee in person or remotely.
- [FT1304](#ft1304) Fraudulent Refund — Require government-issued ID. Tie return transaction to customer profile for monitoring.
- [FT1304.003](#ft1304003) Refund: Non-Receipted Returns — Require government-issued ID. Tie return transaction to customer profile for monitoring.
- [FT1402](#ft1402) Digital Wallet Apps — Verify the person’s identity matches what is on the card in the wallet.
- [FT1403](#ft1403) Cryptocurrency — Positively verify the identity of the customer.

### Escalation | FM1022

<a id="fm1022"></a>

Require additional Escalation to manager for suspicious cases or based on dollar amount.

**Techniques mitigated (7)**

- [FT1010](#ft1010) Insider Recruitment — Require secondary approvals for sensitive actions that can be taken on behalf of customers to limit damage an insider could perform.
- [FT1011](#ft1011) Impersonation Of Retail Employee — Require secondary approvals for sensitive actions that the fraudster may ask employees to perform.
- [FT1206](#ft1206) Item Manipulation — Implement escalation paths for suspicious returns.
- [FT1206.002](#ft1206002) Item Manipulation: Switch Merchandise — Implement Escalation paths for suspicious returns.
- [FT1304](#ft1304) Fraudulent Refund — Escalate suspicious repeat attempts to returns.
- [FT1304.001](#ft1304001) Refund: Refund To Gift Card — Based on value require Escalation to manager.
- [FT1304.002](#ft1304002) Refund: Double Refund — Escalate repeat attempts to return the same item to manager.

### Proof Of Purchase | FM1203

<a id="fm1203"></a>

Require receipts and ID for high-value returns.

**Techniques mitigated (3)**

- [FT1206](#ft1206) Item Manipulation — Require receipts and ID for high-value returns.
- [FT1206.002](#ft1206002) Item Manipulation: Switch Merchandise — Require receipts and ID for high-value returns.
- [FT1207](#ft1207) Returns Process Exploitation — Require proof of purchase such as a receipt before permitting return.

### Delivery Confirmation | FM1204

<a id="fm1204"></a>

Only refund after the item is received and verified.

**Techniques mitigated (4)**

- [FT1207.001](#ft1207001) Returns Process Exploitation: Shipping Manipulation — Only refund after the item is received and verified.
- [FT1302](#ft1302) Marketplace Exploitation — Only refund after the item is received and verified.
- [FT1302.001](#ft1302001) Marketplace Exploitation: Fraudulent Delivery — Only refund after the item is received and verified.
- [FT1302.002](#ft1302002) Marketplace Exploitation: Fraudulent Seller — Only refund after the item is received and verified.

### Proof Of Damage | FM1205

<a id="fm1205"></a>

Require customers to submit photos or video evidence of damage.
Require the physical return of damaged goods before issuing a refund.

**Techniques mitigated (1)**

- [FT1207.002](#ft1207002) Returns Process Exploitation: Damaged Shipment — Require customers to submit photos or video evidence of damage. Require the physical return of damaged goods before issuing a refund.

### Enhanced Packaging | FM1206

<a id="fm1206"></a>

Isolate items that could leak or cause contamination into separate packages.
Use waterproof packaging or tamper-proof seals.

**Techniques mitigated (1)**

- [FT1207.002](#ft1207002) Returns Process Exploitation: Damaged Shipment — Isolate items that could leak or cause contamination into separate packages. Use waterproof packaging or tamper-proof seals.

### Redemption Limits | FM1207

<a id="fm1207"></a>

Limit the amount of store credit that can be used on a single transaction.

**Techniques mitigated (2)**

- [FT1304](#ft1304) Fraudulent Refund — Limit the amount of store credit that can be used on a single transaction.
- [FT1304.003](#ft1304003) Refund: Non-Receipted Returns — Limit the amount of store credit that can be used on a single transaction.

### Law Enforcement | FM1208

<a id="fm1208"></a>

Report known counterfeiters or other confirmed illegal activity to Law Enforcement for action.

**Techniques mitigated (1)**

- [FT1008](#ft1008) Third Party Supplier Manipulation — Report known counterfeiters or other confirmed illegal activity to Law Enforcement for action.

### Online Location Data | FM1209

<a id="fm1209"></a>

Restrict or block return, balance-check, and verification functions based on the originating location. Certain physical or digital locations should not have access to these functions, and locations associated with repeated fraud activity can be blocked.

**Techniques mitigated (3)**

- [FT1103](#ft1103) Check Gift Card Balance — Some physical locations should not be able to check gift card balance. Some locations may also be the source of repeated fraud attempts. Prevent the ability to check gift card status and funds based on locations.
- [FT1103.001](#ft1103001) Check Gift Card Balance: Application — Some physical locations should not be able to check gift card balance. Some locations may also be the source of repeated fraud attempts. Prevent the ability to check gift card status and funds based on locations.
- [FT1303.003](#ft1303003) Checkout: Online/Web Mobile — Some physical locations should not be able to return items. Some locations may also be the source of repeated fraud attempts. Prevent the ability to return items for funds based on locations.

### Phone Number | FM1210

<a id="fm1210"></a>

Automatically block or flag phone numbers associated with VOIP services or with known fraud activity from accessing balance-check, verification, or account-recovery functions.

**Techniques mitigated (1)**

- [FT1103](#ft1103) Check Gift Card Balance — Automatically block phone numbers related to VOIP services and phone numbers that have been known to be used to perpetrate fraud.

### Blacklist Known High-Risk Addresses | FM1211

<a id="fm1211"></a>

Maintain and enforce a blacklist of shipping and billing addresses associated with prior fraud, freight forwarders, or reshipping operations, and block, hold, or flag orders directed to them.

**Techniques mitigated (3)**

- [FT1302](#ft1302) Marketplace Exploitation — Maintain a blacklist of shipping and billing addresses tied to prior fraud, freight forwarders, or reshipping operations, and block or hold orders directed to them.
- [FT1302.001](#ft1302001) Marketplace Exploitation: Fraudulent Delivery — Maintain a blacklist of shipping and billing addresses tied to prior fraud, freight forwarders, or reshipping operations, and block or hold orders directed to them.
- [FT1302.002](#ft1302002) Marketplace Exploitation: Fraudulent Seller — Maintain a blacklist of shipping and billing addresses tied to prior fraud, freight forwarders, or reshipping operations, and block or hold orders directed to them.

### Require Signature on Delivery | FM1212

<a id="fm1212"></a>

Require signature confirmation at delivery for high-value or high-risk orders to establish proof of receipt and reduce fraudulent non-delivery and item-not-received claims.

**Techniques mitigated (3)**

- [FT1302](#ft1302) Marketplace Exploitation — Require signature confirmation at delivery for high-value or high-risk orders to establish proof of receipt and counter fraudulent non-delivery claims.
- [FT1302.001](#ft1302001) Marketplace Exploitation: Fraudulent Delivery — Require signature confirmation at delivery for high-value or high-risk orders to establish proof of receipt and counter fraudulent non-delivery claims.
- [FT1302.002](#ft1302002) Marketplace Exploitation: Fraudulent Seller — Require signature confirmation at delivery for high-value or high-risk orders to establish proof of receipt and counter fraudulent non-delivery claims.

---

## Detection sources

### Anti-Theft Security Tags | FD1001

<a id="fd1001"></a>

A tag or similar device that is attached to an item that will cause an alarm or otherwise alert security personnel when it is removed without authorization.

**Techniques detected (1)**

- [FT1101](#ft1101) Shoplifting — Attach a device to items that will cause an alarm if removed from the store without authorization.

### Video Surveillance Systems | FD1002

<a id="fd1002"></a>

Cameras and related equipment used for monitoring activities in various settings to enhance security, deter crime, and gather evidence when necessary.

**Techniques detected (5)**

- [FT1001](#ft1001) Reconnaissance — At physical locations, use video surveillance to identify and report suspicious individuals to security.
- [FT1010](#ft1010) Insider Recruitment — Use video surveillance system to identify and record suspicious activity for correlation as fraudsters may commit actions over a long period.
- [FT1011](#ft1011) Impersonation Of Retail Employee — Use video surveillance systems to identify and record suspicious activity for correlation, as fraudsters may commit actions over a long period. Correlate suspicious individuals across multiple stores to identify fraudsters.
- [FT1101](#ft1101) Shoplifting — Monitor video feeds for suspicious activity around high value items.
- [FT1203](#ft1203) Gift Card Tampering — At physical locations, use video surveillance to identify instances of fraudsters stealing gift cards and/or returning tampered gift cards

### Behavioral Attributes | FD1003

<a id="fd1003"></a>

Information involving user's behavior and habits. For example, a system might use a user's typing pattern, mouse movements, preferred language, or how they navigate an application, etc., to look for deviations from normal or compare similarity to known abuse or fraud patterns.

**Techniques detected (20)**

- [FT1006](#ft1006) Password Reset — Monitor password reset endpoints for abnormal behavior.
- [FT1010](#ft1010) Insider Recruitment — Monitor employees’ interactions with other employees and discussions regarding potential payment or other ways to receive value for fraudulent activity. Insiders may attempt to hire employees to support their activity. Identify employees’ excessive referrals and the quality of those referrals. For call center or chat-based customer service operations, recruiters will often engage with many customer service representatives to find one who is willing or vulnerable. Identify customer attempts to offer money, jobs, or other reimbursement for actions taken at the retail store.
- [FT1011](#ft1011) Impersonation Of Retail Employee — Monitor employees’ interactions with other employees and discussions regarding potential payment or other ways to receive value for fraudulent activity. Insiders may attempt to hire employees to support their activity. Identify employees’ excessive referrals and the quality of those referrals. For call center or chat-based customer service operations, recruiters will often engage with many customer service representatives to find one who is willing or vulnerable. Identify customer attempts to offer money, jobs, or other reimbursements for actions taken at the retail store.
- [FT1102](#ft1102) Gift Card Extortion — Monitor for out-of-character purchases of an individual and their lifestyle.
- [FT1104](#ft1104) Valid Accounts — Monitor for access attempts and purchases that are significantly different from known good behavior for each customer.
- [FT1105](#ft1105) Credential Stuffing — Monitor for repeated patterns of activity post-login that is an indicator that the activity is automated.
- [FT1205](#ft1205) Loyalty Points Abuse — Monitor for access attempts and purchases that are significantly different from known good behavior for each customer.
- [FT1206](#ft1206) Item Manipulation — Profiles or tenders with high rates of returns in specific categories.
- [FT1206.001](#ft1206001) Item Manipulation: Harvesting — Profiles or tenders with high rates of returns in specific categories.
- [FT1206.002](#ft1206002) Item Manipulation: Switch Merchandise — Identify accounts or tenders with repeated returns in high-counterfeit categories.
- [FT1207](#ft1207) Returns Process Exploitation — Identify fraudsters that make repeat or frequent returns. Identify fraudsters attempting to refund online and in stores.
- [FT1207.001](#ft1207001) Returns Process Exploitation: Shipping Manipulation — Identify fraudsters that make repeat or frequent delivery-based returns.
- [FT1207.002](#ft1207002) Returns Process Exploitation: Damaged Shipment — Flag customers with repeated claims tied to specific accounts, addresses, and/or payment identities. Monitor for claims made on first-time orders by new customers.
- [FT1302](#ft1302) Marketplace Exploitation — Refund returns only to the method of purchase.
- [FT1302.001](#ft1302001) Marketplace Exploitation: Fraudulent Delivery — Refund returns only to the method of purchase.
- [FT1302.002](#ft1302002) Marketplace Exploitation: Fraudulent Seller — Refund returns only to the method of purchase.
- [FT1304](#ft1304) Fraudulent Refund — Flag accounts that are doing frequent gift card refunds. Identify in person or Online Identities attempting gift card refund. Flag accounts attempting frequent non-receipted returns. Monitor for invalid government ID usage. Track items frequently returned without receipts at locations associated with high rates of theft. Compare items against inventory shortage reports.
- [FT1304.001](#ft1304001) Refund: Refund To Gift Card — Flag accounts doing frequent gift card refunds. Identify in person or Online Identities attempting gift card refund.
- [FT1304.002](#ft1304002) Refund: Double Refund — Flag accounts doing frequent gift card refunds. Identify in person or Online Identities attempting gift card refund.
- [FT1304.003](#ft1304003) Refund: Non-Receipted Returns — Flag accounts attempting frequent non-receipted returns. Monitor for invalid government ID usage. Track items frequently returned without receipts at locations associated with high rates of theft. Compare against inventory shortage reports.

### Time-Based Attributes | FD1004

<a id="fd1004"></a>

Time an action occurred that can be compared against a baseline of activity.

**Techniques detected (10)**

- [FT1008](#ft1008) Third Party Supplier Manipulation — Identify returns that happen quickly. This can range from a few minutes from purchase to a day depending on fraudster behavior.
- [FT1103](#ft1103) Check Gift Card Balance — Based on the location of your operations, monitor for activities that occur during off hours.
- [FT1103.001](#ft1103001) Check Gift Card Balance: Application — Based on the location of your operations, monitor for activities that occur during off hours.
- [FT1103.002](#ft1103002) Check Gift Card Balance: Phone Verification — Based on the location of your operations, monitor for activities that occur during off hours.
- [FT1104](#ft1104) Valid Accounts — Based on the location of your operations, monitor for activities that occur during off hours.
- [FT1104.001](#ft1104001) Valid Accounts: Fraudulent Account — Based on the location of your operations, monitor for activities that occur during off hours.
- [FT1104.002](#ft1104002) Valid Accounts: Fraudulent Account Update — Based on the location of your operations, monitor for activities that occur during off hours.
- [FT1104.003](#ft1104003) Valid Accounts: Authorized Account Abuse — Based on the location of your operations, monitor for activities that occur during off hours.
- [FT1205](#ft1205) Loyalty Points Abuse — Based on the location of your operations, monitor for activities that occur during off hours.
- [FT1303.003](#ft1303003) Checkout: Online/Web Mobile — Based on the location of your operations, monitor for activities that occur during off hours.

### Device Attributes | FD1005

<a id="fd1005"></a>

Data related to a user's device, such as a smartphone or laptop, as indicators that identify what type of device and software they are using. For example, a system might require a specific cookie or device identifier, expect a consistent device profile to include screen resolution, memory, operating system, time zone, installed plug-ins or other data that may be used to measure device similarity.

**Techniques detected (15)**

- [FT1103](#ft1103) Check Gift Card Balance — Monitor device factors such as device type, user agent string, operating system, cookies.
- [FT1103.001](#ft1103001) Check Gift Card Balance: Application — Monitor device factors such as device type, user agent string, operating system, cookies.
- [FT1104](#ft1104) Valid Accounts — Monitor device factors such as device type, user agent string, operating system, cookies.
- [FT1104.001](#ft1104001) Valid Accounts: Fraudulent Account — Monitor device factors such as device type, user agent string, operating system, cookies.
- [FT1104.002](#ft1104002) Valid Accounts: Fraudulent Account Update — Monitor device factors such as device type, user agent string, operating system, cookies.
- [FT1104.003](#ft1104003) Valid Accounts: Authorized Account Abuse — Monitor device factors such as device type, user agent string, operating system, cookies.
- [FT1205](#ft1205) Loyalty Points Abuse — Monitor device factors such as device type, user agent string, operating system, cookies.
- [FT1206](#ft1206) Item Manipulation — Use graph or link analysis to find connected devices, IPs, or payment tenders and label them as suspicious for future tracking.
- [FT1206.002](#ft1206002) Item Manipulation: Switch Merchandise — Use graph or link analysis to find connected devices, IP addresses, or payment tenders and label them as suspicious for future tracking.
- [FT1207](#ft1207) Returns Process Exploitation — Identify devices such as a single phone or computer used for many return attempts.
- [FT1207.001](#ft1207001) Returns Process Exploitation: Shipping Manipulation — Identify devices such as a single phone or computer used for many return attempts.
- [FT1303.003](#ft1303003) Checkout: Online/Web Mobile — Monitor device factors such as device type, user agent string, operating system, cookies.
- [FT1304](#ft1304) Fraudulent Refund — Detect repeat attempts from the same computer or phone submitting duplicate requests.
- [FT1304.001](#ft1304001) Refund: Refund To Gift Card — Detect repeat attempts from the same computer or phone.
- [FT1304.002](#ft1304002) Refund: Double Refund — Detect repeat attempts from the same computer or phone submitting duplicate requests.

### Velocity Attributes | FD1006

<a id="fd1006"></a>

Frequency or unusual velocity of an action compared to baseline by some aggregation value. An action might be gift card balance checks. An aggregation value might be a device identifier, IP address, user account ID, or other value. Optionally there can be a metric aggregation like count, sum, distinct count, average, standard deviation, etc. A concrete example might be looking for a large volume of orders in a short period of time for an account.

**Techniques detected (20)**

- [FT1006](#ft1006) Password Reset — Identify automated attempts to validate a credential list by volume of attempts.
- [FT1008](#ft1008) Third Party Supplier Manipulation — Fraudsters will attempt a high number of returns at once. This may be multiples of same item or different items.
- [FT1009](#ft1009) Fake Receipt Generation — A large volume of receipts may obscure or overlap with a genuine receipt. A large number of items on the receipt.
- [FT1102](#ft1102) Gift Card Extortion — Monitor the purchase of gift cards by value and quantity from an individual by a predetermined value and/or time frame.
- [FT1103](#ft1103) Check Gift Card Balance — Monitor for number of requests based on a predetermined number of requests over a set amount of time.
- [FT1103.001](#ft1103001) Check Gift Card Balance: Application — Monitor for number of requests based on a predetermined number of requests over a set amount of time.
- [FT1103.003](#ft1103003) Verification — Monitor for gift cards a person is attempting to verify.
- [FT1104.001](#ft1104001) Valid Accounts: Fraudulent Account — Monitor for accounts that are created quickly in succession from the same location or with similar features.
- [FT1104.002](#ft1104002) Valid Accounts: Fraudulent Account Update — Monitor for accounts that are created quickly in succession from the same location or with similar features.
- [FT1104.003](#ft1104003) Valid Accounts: Authorized Account Abuse — Monitor for accounts that are created quickly in succession from the same location or with similar features.
- [FT1105](#ft1105) Credential Stuffing — Monitor for surges in login attempts and other anomalous activity. Monitor the response to login attempts where a surge in attempts to access accounts that do not exist at the target organization is a strong indicator of automated credential stuffing.
- [FT1202](#ft1202) Gift Card Merge — Identify suspicious transfers from many gift cards to one gift card. For example if 20 gift cards with value of $5 are added to a single gift card.
- [FT1207.002](#ft1207002) Returns Process Exploitation: Damaged Shipment — Monitor for frequent damage claims of specific items.
- [FT1209](#ft1209) Wardrobing — Profiles or tenders with high rates of returns in specific categories.
- [FT1302.002](#ft1302002) Marketplace Exploitation: Fraudulent Seller — Flag sellers with multiple returns or chargebacks.
- [FT1303.001](#ft1303001) Checkout: Point of Sale — Monitor returns for total amount and total value of items returned.
- [FT1303.002](#ft1303002) Checkout: Guest Services — Monitor returns for total amount and total value of items returned.
- [FT1303.003](#ft1303003) Checkout: Online/Web Mobile — Monitor for number of requests based on a predetermined number of requests over a set amount of time.
- [FT1304](#ft1304) Fraudulent Refund — Identify accounts requesting several refunds in a short time.
- [FT1304.002](#ft1304002) Refund: Double Refund — Identify accounts requesting several refunds in a short time.

### Network Traffic Attributes | FD1007

<a id="fd1007"></a>

Metadata about an IP address like whether it is a hosting provider, VPN or Proxy service, Residential network, cellular provider, or residential ISP. This information may also be associated with user accounts or devices to baseline them over time and look for deviations from the usual access patterns.

**Techniques detected (13)**

- [FT1001](#ft1001) Reconnaissance — Automated network reconnaissance will scan internet resources in a manner that a normal user typically will not. Monitor for connections to suspicious ports and traversal to suspicious directories such as www.mywebsite.com/admin or www.mywebsite.com/phpadmin
- [FT1003](#ft1003) Fake Pages — Monitor domain registration, certificate transparency logs, and phishing sites to identify sites established with your branding but designed to fool your customers into divulging information.
- [FT1007](#ft1007) Proxy Abuse — Aggregate IP addresses to identify the common carriers / autonomous system numbers. Establish normal and abnormal behavior for traffic originating from those networks.
- [FT1103](#ft1103) Check Gift Card Balance — Monitor for Network Traffic Attributes such as IP Address, DNS Name, ASN, and other digital location attributes especially if some of these sources have known fraud activity or have a high risk of fraud activity.
- [FT1103.001](#ft1103001) Check Gift Card Balance: Application — Monitor for Network Traffic Attributes such as IP Address, DNS Name, ASN, and other digital location attributes especially if some of these sources have known fraud activity or have a high risk of fraud activity.
- [FT1104](#ft1104) Valid Accounts — Monitor for Network Traffic Attributes such as IP Address, DNS Name, ASN, and other digital location attributes especially if some of these sources have known fraud activity or have a high risk of fraud activity.
- [FT1104.001](#ft1104001) Valid Accounts: Fraudulent Account — Monitor for Network Traffic Attributes such as IP Address, DNS Name, ASN, and other digital location attributes especially if some of these sources have known fraud activity or have a high risk of fraud activity.
- [FT1104.002](#ft1104002) Valid Accounts: Fraudulent Account Update — Monitor for Network Traffic Attributes such as IP Address, DNS Name, ASN, and other digital location attributes especially if some of these sources have known fraud activity or have a high risk of fraud activity.
- [FT1104.003](#ft1104003) Valid Accounts: Authorized Account Abuse — Monitor for Network Traffic Attributes such as IP Address, DNS Name, ASN, and other digital location attributes especially if some of these sources have known fraud activity or have a high risk of fraud activity.
- [FT1205](#ft1205) Loyalty Points Abuse — Monitor for Network Traffic Attributes such as IP Address, DNS Name, ASN, and other digital location attributes especially if some of these sources have known fraud activity or have a high risk of fraud activity.
- [FT1302](#ft1302) Marketplace Exploitation — Identify mismatch between Network Traffic Attributes such as IP geo location against the billing and shipping address.
- [FT1302.001](#ft1302001) Marketplace Exploitation: Fraudulent Delivery — Identify mismatch between Network Traffic Attributes such as IP geo location against the billing and shipping address.
- [FT1303.003](#ft1303003) Checkout: Online/Web Mobile — Monitor for Network Traffic Attributes such as IP Address, DNS Name, ASN, and other digital location attributes especially if some of these sources have known fraud activity or have a high risk of fraud activity.

### VOIP Attribute | FD1008

<a id="fd1008"></a>

A VOIP (Voice over Internet Protocol) number is a virtual phone number that is not tied to physical telephones or mobile phones. These numbers are highly portable and may be swapped and reused.

**Techniques detected (3)**

- [FT1103](#ft1103) Check Gift Card Balance — Monitor for use of VOIP numbers that are not tied to a physical landline or mobile phone.
- [FT1103.002](#ft1103002) Check Gift Card Balance: Phone Verification — Monitor for use of VOIP numbers that are not tied to a physical landline or mobile phone.
- [FT1401](#ft1401) VOIP Abuse — Identify VOIP phone usage and correlate against customer profile. Identify high-risk VOIP numbers or multiple accounts with the same VOIP number in your database.

### Online Identities | FD1009

<a id="fd1009"></a>

Email addresses, Telegram usernames, social media handles, accounts, etc., that have been the source of fraudulent activities.

**Techniques detected (5)**

- [FT1001](#ft1001) Reconnaissance — When account creation has limited restrictions, fraudsters often create test accounts to develop automation, test fraud techniques, or validate stolen credentials. These accounts frequently use fake identity information and can provide insight into an actor’s methods and intent. Organizations should monitor account creation activity for abnormal behavior, as fraudsters may also use registration flows to determine whether accounts already exist before attempting credential-based attacks.
- [FT1004](#ft1004) Acquire Database — Subscribe to breach databases and monitor logins for usage of known or publicly compromised credentials.
- [FT1104.002](#ft1104002) Valid Accounts: Fraudulent Account Update — Monitor for account creations with suspicious names that do not appear legitimate. Some examples are ABCD, AAA, QAZ, etc.
- [FT1206](#ft1206) Item Manipulation — Use graph or link analysis to find connected accounts.
- [FT1206.002](#ft1206002) Item Manipulation: Switch Merchandise — Use graph or link analysis to find connected accounts.

### Transaction Data | FD1010

<a id="fd1010"></a>

Records that are related to transactions in-store or online.

**Techniques detected (21)**

- [FT1008](#ft1008) Third Party Supplier Manipulation — Identify indicators of counterfeit or fake items such as poor packaging or labeling with incorrect or repeating serial numbers.
- [FT1009](#ft1009) Fake Receipt Generation — Identify refunds that do not have proper proof of purchase.
- [FT1201](#ft1201) Gift Card Return — Identify suspicious purchases and returns by gift card numbers.
- [FT1202](#ft1202) Gift Card Merge — Identify suspicious transfer of value from gift cards to other gift cards.
- [FT1204](#ft1204) Gift Card Redemption — Identify suspicious purchases of commonly resold items with potentially illicitly obtained gift cards.
- [FT1206](#ft1206) Item Manipulation — Match returned product identifiers (IMEI, serial, RFID) to the original purchase record.
- [FT1206.002](#ft1206002) Item Manipulation: Switch Merchandise — Match returned product identifiers (IMEI, serial, RFID) to the original purchase record.
- [FT1207](#ft1207) Returns Process Exploitation — Record serial numbers to make sure refunds match the product.
- [FT1207.001](#ft1207001) Returns Process Exploitation: Shipping Manipulation — Match refund claims with shipping records.
- [FT1301](#ft1301) Resale — Monitor for anomalous purchases of easily monetized items such as Electronics, and Luxury Goods.
- [FT1301.001](#ft1301001) Resale: Drop Shipping — Monitor for anomalous purchases of easily monetized items such as Electronics and Luxury Goods.
- [FT1303](#ft1303) Checkout — Monitor for returns of items commonly related to fraud such as gift cards, Luxury Items, and Electronics for fraudulent activity.
- [FT1303.001](#ft1303001) Checkout: Point of Sale — Monitor and record product serial number of items that are commonly related to fraud.
- [FT1303.002](#ft1303002) Checkout: Guest Services — Monitor and record product serial number of items that are commonly related to fraud.
- [FT1303.003](#ft1303003) Checkout: Online/Web Mobile — Monitor and record product serial number of items that are commonly related to fraud.
- [FT1304](#ft1304) Fraudulent Refund — Identify multiple refund requests for the same order. Check if item identifiers (IMEI, serial, RFID) can be associated with a prior purchase. Identify the same return in multiple stores and online.
- [FT1304.001](#ft1304001) Refund: Refund To Gift Card — Record serial numbers for refunded gift cards.
- [FT1304.002](#ft1304002) Refund: Double Refund — Identify multiple refund requests for the same order. Identify the same return in multiple stores and online.
- [FT1304.003](#ft1304003) Refund: Non-Receipted Returns — Check if item identifiers (IMEI, serial, RFID) can be associated with a prior purchase.
- [FT1403](#ft1403) Cryptocurrency — Use CTI to correlate and identify crypto wallets that are either suspicious or have been identified as supporting illegal activity or fraud.
- [FT1404](#ft1404) Gift Cards as Defense Evasion — Identify suspicious purchases of commonly resold items with potentially illicitly obtained gift cards.

### Market Resale Data | FD1011

<a id="fd1011"></a>

Monitor sales of items through third-party market monitoring and other resale data.

**Techniques detected (1)**

- [FT1301.002](#ft1301002) Resale: Unwitting Buyer — Monitor for anomalous sales of serialized items and gift cards in third party locations and other repositories.

### Controlled Purchase | FD1012

<a id="fd1012"></a>

Purchase items from Third Party Supplier to identify indicators of fraud.

**Techniques detected (1)**

- [FT1008](#ft1008) Third Party Supplier Manipulation — Purchase items from Third Party Supplier to identify indicators of fraud.

### Item Condition & Tag Checks | FD1013

<a id="fd1013"></a>

Ensure item is returned with all its components such as packaging, accessories, and documentation in good condition.
Verify additional attributes such as weight, general wear and tear.
s

**Techniques detected (3)**

- [FT1206](#ft1206) Item Manipulation — Ensure item is returned with all its components such as packaging, accessories, and documentation in good condition. Verify additional attributes such as weight, general wear and tear. Scuffs on screws Reapplied tape Do not accept returns that are missing components or may be suspicious.
- [FT1206.001](#ft1206001) Item Manipulation: Harvesting — Ensure item is returned with all its components such as packaging, accessories, and documentation in good condition. Verify additional attributes such as weight, general wear and tear. Scuffs on screws Reapplied tape Do not accept returns that are missing components or may be suspicious.
- [FT1209](#ft1209) Wardrobing — Inspect the item being returned for missing original packaging, tags, or signs of use (stains, scuffs).

### Credit Redemption Behavior | FD1014

<a id="fd1014"></a>

Monitor for the consolidation of in-store credit gift cards to purchase high value items or issued to multiple identities (e.g. electronics).

**Techniques detected (2)**

- [FT1304](#ft1304) Fraudulent Refund — Monitor for the consolidation of in-store credit gift cards to purchase high-value items or issued to multiple identities (e.g. electronics).
- [FT1304.003](#ft1304003) Refund: Non-Receipted Returns — Monitor for the consolidation of in-store credit gift cards to purchase high value items or issued to multiple identities (e.g. electronics).

### Location Attributes | FD1016

<a id="fd1016"></a>

Identify mismatch between billing and shipping address.
Identify illegitimate or fake addresses.

**Techniques detected (3)**

- [FT1302](#ft1302) Marketplace Exploitation — Identify mismatch between billing and shipping address.
- [FT1302.001](#ft1302001) Marketplace Exploitation: Fraudulent Delivery — Identify mismatch between billing and shipping address.
- [FT1402](#ft1402) Digital Wallet Apps — Identify impossible travel transactions for the same credit, debit, or gift card.

---

## Corrections

v2.0 states most relationships more than once and the records disagree in places. Where either record asserts a relationship it is kept, so nothing is lost. Every difference between this file and the published document:

- FT1206: citation FM1013 re-pointed to FD1013 (the cited name is FD1013 exactly; FM1013 is DNS Registration)
- FT1001: FM1016 cited as "Security Guards", shown under its catalog name "Security Guard"
- FT1101: FM1016 cited as "Security Guards", shown under its catalog name "Security Guard"
- FT1103.003: tactic Initial Access added (the technique matrix lists it there)
- FT1104.002: tactic Control added (the technique matrix lists it there)
- FT1304.003: tactic Monetization added (the technique matrix lists it there)
- FT1009: channel Social Engineering added (the channel tables list it there)
- FT1103.003: channel Analog added (the channel tables list it there)
- FT1103.003: channel Social Engineering added (the channel tables list it there)
- FT1103.003: scheme taken from its sibling sub-techniques (the entry carries no Tactic / Channel / Scheme line)

Control cross-references are merged in both directions, so a mitigation or detection source lists every technique that cites it even where v2.0 records the link in only one direction.
