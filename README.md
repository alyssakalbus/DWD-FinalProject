# Dynamic Web Development x Bioart as Biopolitics Final Project

**I was unable to get this to run on Glitch because the database would't authenticate. Everything runs perfectly locally, I think I just need to rest and try again :/**

## How to Set Up & Run
1. Download .zip
2. Open in VSCode
3. Open terminal
4. Install npm
5. Install dependencies w/ npm (express, mongoose, bcrypt, etc.)
6. Dev Mode -> npm run dev
7. Start -> npm start

## Original Project Proposal

**Research Questions, Criticisms, and Observations**
- What can the intentions and outcomes of military research reveal about future products and services?
- How does the illusion of user agency shape our interactions with technology?
- How does our understanding of history influence technology literacy?
- Can we separate the history of a technology from it’s current uses?
- People seem very willing to give up their data, genetic or otherwise, in exchange for a sense of belonging or security.
- How can humor or satire be used in a speculative work to entice critical reflection on our relationships to technology and data / genetic privacy or ownership?
- Why do people often feel a sense of ownership or perceive authority in intangible products?
- If biometric ownership, security, and encryption becomes a luxury service, what happens to those who can’t afford to encrypt themselves?
- What does it mean for DNA to be “secure,” and who is defining the metrics of security?

**Project Sypnosis**

In a near future where DNA is treated as just another dataset, people’s genetic data is treated similarly to your online activity. Insurance and marketing companies are able to predict everything about you based on your genetic predispositions, and doctor’s office’s are constantly hacked to obtain new, updated datasets, and are often shared with state-funded surveillance organizations. This wellness-centered service that frames bio-encryption as the next stage of “wellness” and “mindfulness,” offering genetic editing therapies to confuse and throw off algorithms, but the only people that can afford the service are those who collected the data in the first place. My process will be a mix of writing, worldbuilding, and a final web development project. The website will be a critical look into a potential future regarding the increasing practice of highly invasive biometric surveillance practices and genetic ownership. The purpose of this project is to present a realistic technology that speculates on the future of genetic surveillance. With the ongoing consequences that we see of the ”health and wellness” industry taking advantage of collapsing healthcare infrastructure in the United States, we are increasingly likely moving toward a future that disregards all health and biometric data as private information and instead used to make our lives more “convenient” or if they were being honest: it will be used to make our lives more trackable and exploitable.

**Research**

DNA Steganography is the process of embedding secret content into strands of synthetic or modified DNA in a way that is undetectable unless they have the “key” to decode it. Secret content can be embedded in DNA by translating DNA nucleotides (A, T, C, and G) into ASCII (A= 00, T = 11, C = 01, G = 10). The content’s (messages, imagery, software, etc.) binary data is converted to a string of ATCG letters and embedded within the DNA sequence. Only someone with the key, which would most likely be a PCR Primer that binds the message-containing strand, would be able to amplify and have access to the hidden content. This kind of process can also be combined with sythetic DNA practices to physically encode people's DNA. 

### **How does it work, and how much does it cost?**

| **Service Step**       | **What It Covers**                                                                 | **Current Cost** | **Estimated Cost (2045)**               |
|------------------------|-------------------------------------------------------------------------------------|------------------|------------------------------------------|
| **Data Encoding**      | Steganographic embedding of encrypted biometric ID into synthetic DNA.            | $2M              | ~$3.7M                                   |
| **Gene Editing**       | CRISPR-based full-body encryption therapy.                                        | $2M              | ~$3.7M                                   |
| **Delivery Method**    | Electroporation treatment, luxury neural interface, bioelectric spa experience.   | $4M              | ~$7.4M                                   |
| **Ongoing Maintenance**| Annual genome scrambling updates to stay ahead of decoding algorithms.            | $1M              | ~$1.85M                                  |
| **Total**              | —                                                                                  | **$9M**          | **~$16.65M**                             |
| **With Inflation (3.2%/yr over 20 years)** | —                                                              | —                | **$17M–$23M**, depending on features & tier |


**Sources**

- Malathi P, Manoaj M, Manoj R, Vaikunth Raghavan, Vinodhini R.E., Highly Improved DNA Based Steganography, Procedia Computer Science, Volume 115, 2017, Pages 651-659, ISSN 1877-0509.
- Reif, John H. “Task 3: Molecular Scale Memory and Associated Computing Techniques.” Duke University Department of Computer Science.
- Rueda J. Affordable pricing of CRISPR treatments is a pressing ethical imperative. CRISPR J. 2024;7(1):1–3. PMID: 39392045.
- "Electroporation." ScienceDirect.


## Project Outcome & Next Steps
The API I ended up building was quite difficult. The "encryption" thing seemed too simple, so I decided to teach myself how to set up a log in / sign up / user dashboard funciton. I'm eventually thinking about this site site being believeable complete with a marketing video and a speculative product of some kind. 

## Development Process


## Mood Board and Inspiration

<table>
  <tr>
    <td align="center"><img src="/process/process_moodboard_01.png" width="200"/><br/><sub>Colossol - Real Bioengineering Company</sub></td>
    <td align="center"><img src="/process/process_moodboard_02.png" width="200"/><br/><sub>Palantir - Data Company</sub></td>
    <td align="center"><img src="/process/process_moodboard_03.png" width="200"/><br/><sub>Layout Reference</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="/process/process_moodboard_04.png" width="200"/><br/><sub>Style Reference</sub></td>
    <td align="center"><img src="/process/process_moodboard_05.png" width="200"/><br/><sub>Style Reference for Navigation</sub></td>
    <td align="center"><img src="/process/process_moodboard_06.png" width="200"/><br/><sub>DNA Animation Reference</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="/process/process_moodboard_07.png" width="200"/><br/><sub>Style Reference</sub></td>
    <td align="center"><img src="/process/process_moodboard_08.png" width="200"/><br/><sub>Type and Navigation Style Reference</sub></td>
    <td align="center"><img src="/process/process_moodboard_09.webp" width="200"/><br/><sub>Original Xbox UI Design - Really Like the Idea of Circle UI</sub></td>
  </tr>
</table>

---

## Sketches and Wireframes

<table>
  <tr>
    <td align="center">
      <img src="/process/process_sketch.png" width="450"/><br/>
      <sub>Sketch</sub>
    </td>
    <td align="center">
      <img src="/process/process_wireframe_01.png" width="450"/><br/>
      <sub>Wireframe 1</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/process/process_wireframe_02.png" width="450"/><br/>
      <sub>Wireframe 2</sub>
    </td>
    <td align="center">
      <img src="/process/process_wireframe_03.png" width="450"/><br/>
      <sub>Wireframe 3</sub>
    </td>
  </tr>
</table>


---

## Final Design (Screenshots)

<table>
  <tr>
    <td align="center">
      <img src="/process/final_01.png" width="500"/><br/>
      <sub>Home / Landing Page</sub>
    </td>
    <td align="center">
      <img src="/process/final_02.png" width="500"/><br/>
      <sub>Log In</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/process/final_03.png" width="500"/><br/>
      <sub>Sign Up</sub>
    </td>
    <td align="center">
      <img src="/process/final_04.png" width="500"/><br/>
      <sub>User Dashboard</sub>
    </td>
  </tr>
</table>


