"""ATS-friendly Times New Roman resume (standard Times PDF fonts for ATS parsing)."""

from pathlib import Path

from fpdf import FPDF

OUT = Path(__file__).resolve().parents[1] / "public" / "resume.pdf"

# Compact sizes
NAME = 14
SECTION = 10
JOB = 9
META = 8
BODY = 8.5
LEAD = 10
CONTACT = 8


class Resume(FPDF):
    def __init__(self):
        super().__init__(format="Letter", unit="pt")
        self.set_auto_page_break(auto=True, margin=28)
        self.set_margins(50, 28, 50)

    def section(self, title: str):
        self.ln(2)
        self.set_font("Times", "B", SECTION)
        self.set_text_color(0, 0, 0)
        self.cell(0, 10, title.upper(), new_x="LMARGIN", new_y="NEXT")
        y = self.get_y()
        self.set_draw_color(0, 0, 0)
        self.set_line_width(0.6)
        self.line(self.l_margin, y, self.w - self.r_margin, y)
        self.ln(2)

    def rich(self, text: str, size: float = BODY, leading: float = LEAD):
        parts: list[tuple[bool, str]] = []
        buf = ""
        bold = False
        i = 0
        while i < len(text):
            if text.startswith("**", i):
                if buf:
                    parts.append((bold, buf))
                    buf = ""
                bold = not bold
                i += 2
                continue
            buf += text[i]
            i += 1
        if buf:
            parts.append((bold, buf))

        max_w = self.w - self.l_margin - self.r_margin
        line_parts: list[tuple[bool, str]] = []
        line_w = 0.0

        def flush_line():
            nonlocal line_parts, line_w
            if not line_parts:
                return
            x = self.l_margin
            y = self.get_y()
            for is_bold, chunk in line_parts:
                self.set_font("Times", "B" if is_bold else "", size)
                self.set_xy(x, y)
                w = self.get_string_width(chunk)
                self.cell(w, leading, chunk)
                x += w
            self.ln(leading)
            line_parts = []
            line_w = 0.0

        for is_bold, part in parts:
            words = part.split(" ")
            for wi, word in enumerate(words):
                token = word if wi == 0 else (" " + word)
                if token == "":
                    continue
                self.set_font("Times", "B" if is_bold else "", size)
                tw = self.get_string_width(token)
                if line_w + tw > max_w and line_parts:
                    flush_line()
                    token = token.lstrip(" ")
                    if not token:
                        continue
                    tw = self.get_string_width(token)
                line_parts.append((is_bold, token))
                line_w += tw
        flush_line()

    def bullet(self, text: str, size: float = BODY, leading: float = LEAD):
        x0 = self.l_margin
        self.set_font("Times", "", size)
        self.set_xy(x0 + 5, self.get_y())
        self.cell(7, leading, "-")
        old_l = self.l_margin
        self.set_left_margin(x0 + 14)
        self.set_x(x0 + 14)
        self.rich(text, size=size, leading=leading)
        self.set_left_margin(old_l)

    def contact_line(self, items: list[tuple[str, str | None]], size: float = CONTACT):
        self.set_font("Times", "", size)
        sep = " | "
        widths = [self.get_string_width(label) for label, _ in items]
        total = sum(widths) + self.get_string_width(sep) * (len(items) - 1)
        x = (self.w - total) / 2
        y = self.get_y()
        for i, (label, url) in enumerate(items):
            self.set_xy(x, y)
            if url:
                self.set_text_color(0, 0, 200)
                self.set_font("Times", "U", size)
                self.cell(widths[i], 9, label, link=url)
                self.set_text_color(0, 0, 0)
                self.set_font("Times", "", size)
            else:
                self.set_font("Times", "", size)
                self.cell(widths[i], 9, label)
            x += widths[i]
            if i < len(items) - 1:
                self.set_xy(x, y)
                self.cell(self.get_string_width(sep), 9, sep)
                x += self.get_string_width(sep)
        self.ln(8)


def build():
    pdf = Resume()
    pdf.add_page()

    pdf.set_font("Times", "B", NAME)
    pdf.cell(0, 14, "SHIVA SHANKAR CHANDA", align="C", new_x="LMARGIN", new_y="NEXT")

    pdf.contact_line(
        [
            ("Full Stack Developer", None),
            ("Hyderabad, Telangana", None),
            ("+91 96183-94701", None),
            ("shankarshiva74541@gmail.com", "mailto:shankarshiva74541@gmail.com"),
            ("GitHub", "https://github.com/Samplerritgithu"),
            ("LinkedIn", "https://www.linkedin.com/in/chanda-shiva-shankar-3bb6b5260/"),
        ]
    )

    pdf.section("Professional Summary")
    pdf.rich(
        "Full Stack Developer with **2+ years** of experience building scalable web and mobile applications "
        "using **Python, Django, Django REST Framework, FastAPI, React, React Native, HTML, CSS, JavaScript, "
        "and PostgreSQL/MySQL**. Delivered production systems with REST APIs, real-time WebSockets, secure "
        "JWT/RBAC auth, and cloud deployments on **AWS/Linux/NGINX**. Hands-on with **AI engineering**: "
        "**LLM integration, RAG pipelines, embeddings, semantic search, and vector databases**."
    )

    pdf.section("Technical Skills")
    for line in [
        "**Languages:** Python, JavaScript, TypeScript, SQL, HTML, CSS",
        "**Backend:** Django, Django REST Framework, FastAPI, Flask, REST APIs, WebSockets, Celery, Redis, JWT, RBAC",
        "**Frontend / UX:** React.js, Next.js, Redux, Material UI, Tailwind CSS, Responsive Design",
        "**Mobile:** React Native, Expo, Flutter",
        "**AI / LLM / RAG:** LLM Integration, RAG Pipelines, Embeddings, Semantic Search, Vector DBs, Prompt Engineering, OpenCV, TensorFlow, PyTorch",
        "**Databases / BaaS:** PostgreSQL, MySQL, MongoDB, Redis, Firebase, Elasticsearch",
        "**DevOps:** AWS, Azure, Docker, CI/CD, Linux, NGINX, Git, GitHub Actions",
        "**Additional:** SOLID, Clean Architecture, Caching, Secure APIs, Agile/Scrum",
        "**Leadership:** Team Lead (PROMS), Mentorship, Code Reviews, Delivery Coordination",
    ]:
        pdf.rich(line)

    pdf.section("Professional Experience")

    pdf.set_font("Times", "B", JOB)
    pdf.cell(0, 10, "Full Stack Developer | Avsys International India Pvt Ltd", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Times", "I", META)
    pdf.cell(0, 9, "Hyderabad, Telangana | August 2024 - Present", new_x="LMARGIN", new_y="NEXT")

    avsys_sections = [
        (
            "Enterprise Web / Django Product Development",
            [
                "Own end-to-end web feature enhancements for enterprise products using **Python, Django, Django REST Framework, PostgreSQL, REST APIs, Bootstrap, JavaScript, HTML, and CSS**, writing reusable and maintainable code across multiple projects.",
                "Partner with product/stakeholder needs to shape application workflows and UX-friendly frontend experiences; design database schemas, business logic, and RESTful APIs for reliable, low-latency delivery.",
            ],
        ),
        (
            "Defense Aviation Simulation Platform",
            [
                "Engineered **Django** backend architecture with **25+ models**, strong database concepts, and geospatial analytics (**GeoDjango, PostGIS**), plus visualization with **CesiumJS/Three.js**.",
                "Optimized queries and computational logic to cut mission-processing time from approximately 3-4 hours to 25-30 minutes (**about 90% improvement**) - high-volume processing under latency constraints.",
            ],
        ),
        (
            "ProMS - Internal Project Management System",
            [
                "Built PROMS from scratch on the Dev and HR sides (frontend, **Django** backend, APIs, **PostgreSQL**, authentication) and combined PROMS, HRM, and the bug-tracking tool into one company web product.",
                "Led a **3-member team** through planning, code reviews, and delivery coordination; shipped real-time collaboration with **Django Channels/WebSockets**.",
            ],
        ),
        (
            "Additional Product Work",
            [
                "Built a **Flutter/Dart** Android client for a military training platform synced with **Django REST APIs** (Riverpod, video playback, viewing history).",
                "Independently delivered the ML component of a wildlife monitoring system (**YOLOv8, Roboflow, Google Colab**) for live CCTV detection.",
            ],
        ),
    ]
    for title, bullets in avsys_sections:
        pdf.set_font("Times", "B", BODY)
        pdf.cell(0, 9, title, new_x="LMARGIN", new_y="NEXT")
        for b in bullets:
            pdf.bullet(b)

    pdf.ln(1)
    pdf.set_font("Times", "B", JOB)
    pdf.cell(0, 10, "Full Stack Developer Intern | Bharath Intern", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Times", "I", META)
    pdf.cell(0, 9, "Madhya Pradesh, India | January 2024 - May 2024", new_x="LMARGIN", new_y="NEXT")
    pdf.bullet(
        "Built a media streaming platform with **React**, search, and recommendations; improved wait time by **about 25% using caching**; deployed on **Azure**."
    )

    pdf.ln(1)
    pdf.set_font("Times", "B", JOB)
    pdf.cell(0, 10, "Full Stack Developer Intern | Interpe", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Times", "I", META)
    pdf.cell(0, 9, "New Delhi, India | July 2023 - August 2023", new_x="LMARGIN", new_y="NEXT")
    pdf.bullet(
        "Developed e-commerce with **Django REST APIs, MySQL**, and AWS; reduced manual promotion effort by **about 30%**."
    )

    pdf.section("Project Experience")

    pdf.set_font("Times", "B", JOB)
    pdf.cell(0, 10, "DocuMind AI - LLM & RAG Knowledge Assistant", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Times", "I", META)
    pdf.cell(
        0,
        9,
        "Python, FastAPI, LLM, RAG, Embeddings, Vector DB, React, Redis, Docker",
        new_x="LMARGIN",
        new_y="NEXT",
    )
    for b in [
        "Built an AI knowledge assistant that answers questions from uploaded PDFs/docs using **LLM + RAG** - chunking, embeddings, vector retrieval, grounded generation with source citations.",
        "Designed **FastAPI** orchestration for prompt templates, context injection, and chat history; **React** UI for document upload and conversational Q&A.",
    ]:
        pdf.bullet(b)

    pdf.set_font("Times", "B", JOB)
    pdf.cell(
        0,
        10,
        "Blood450 - AI-Powered Blood Donation & Emergency Donor Matching Platform",
        new_x="LMARGIN",
        new_y="NEXT",
    )
    pdf.set_font("Times", "I", META)
    pdf.cell(
        0,
        9,
        "Django, Django REST Framework, Flutter, PostgreSQL/PostGIS, Redis, Django Channels, Celery, JWT, Google OAuth, AWS/Vercel",
        new_x="LMARGIN",
        new_y="NEXT",
    )
    for b in [
        "Developed a full-stack blood donation platform with **Django/DRF** backend and **Flutter** mobile application, supporting donor registration, authentication, donor profiles, blood-group based search, availability and donation-history management.",
        "Implemented location-based donor discovery using geospatial data, enabling emergency requests to identify nearby eligible donors and progressively expand the search radius when required.",
        "Built secure REST APIs with **JWT** authentication, **Google OAuth** integration, OTP-based verification, and role-based access flows for users, donors and administrators.",
        "Integrated **Redis**, **Django Channels** and asynchronous processing to support real-time communication and emergency donor notification workflows.",
        "Designed donor eligibility logic based on last donation date and 90-day eligibility rules, with separate administrative views for eligible, ineligible and unavailable donors.",
        "Developed and integrated the **Flutter** Android application with the Django backend, ensuring consistency between mobile and web registration, authentication, donor onboarding and emergency workflows.",
        "Worked on production deployment and cloud integration, including **AWS/Vercel** environments, PostgreSQL/Supabase connectivity, environment configuration, API endpoints and release APK configuration.",
    ]:
        pdf.bullet(b)

    # Keep FlightDeck Aviators fully on the next page (no split)
    pdf.add_page()
    pdf.set_font("Times", "B", JOB)
    pdf.cell(0, 10, "FlightDeck - Aviation Platform for Indian Aviators", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Times", "I", META)
    pdf.cell(
        0,
        9,
        "React, React Native (iOS/Android), Firebase (Auth/Firestore)",
        new_x="LMARGIN",
        new_y="NEXT",
    )
    for b in [
        "Took full ownership of an existing live aviation platform across web and mobile (**React Native** for iOS and Android), working independently from requirements through release.",
        "Used **Firebase (Auth/Firestore)** as the shared backend for both web and mobile; delivered admin/content workflows and kept UX aligned across platforms.",
        "Investigated production issues and shipped fixes without rewriting the product; contributed practical architectural improvements while preserving existing systems.",
    ]:
        pdf.bullet(b)

    pdf.section("Education")
    pdf.set_font("Times", "B", JOB)
    pdf.cell(
        0,
        10,
        "B.Tech, Computer Science and Engineering | TKR College of Engineering and Technology",
        new_x="LMARGIN",
        new_y="NEXT",
    )
    pdf.set_font("Times", "I", META)
    pdf.cell(0, 9, "Hyderabad, India | August 2020 - June 2024 | GPA: 8.30", new_x="LMARGIN", new_y="NEXT")

    pdf.section("Certificates")
    pdf.set_font("Times", "", BODY)
    pdf.multi_cell(
        0,
        LEAD,
        "Data Structures and Algorithms in Python (Aug 2023) | Kimo Python Certificate (Apr 2023) | ReactJS National Workshop (Jul 2021)",
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT))
    print(f"Wrote {OUT} pages={pdf.page} y={pdf.get_y():.1f}")


if __name__ == "__main__":
    build()
