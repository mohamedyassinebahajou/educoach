"""EduCoach Streamlit UI — role-based login + coach / learner dashboards."""

from __future__ import annotations

import os
from datetime import datetime
from typing import Any

import httpx
import pandas as pd
import streamlit as st

from src.ui.auth import User, authenticate, demo_credentials_hint

API_URL = os.getenv("API_URL", "http://localhost:8000").rstrip("/")

CUSTOM_CSS = """
<style>
  /* High contrast: dark text on bright surfaces */
  :root {
    --ec-bg: #f1f5f9;
    --ec-surface: #ffffff;
    --ec-text: #0f172a;
    --ec-muted: #334155;
    --ec-border: #cbd5e1;
    --ec-primary: #1e3a8a;
  }

  .stApp {
    background: var(--ec-bg) !important;
    color: var(--ec-text) !important;
  }

  html, body, [class*="css"], .stMarkdown, .stMarkdown p, .stMarkdown li,
  .stText, .stCaption, label, .stSelectbox, .stRadio, .stCheckbox,
  .stNumberInput, .stTextInput, .stExpander, [data-testid="stWidgetLabel"],
  [data-testid="stMarkdownContainer"], [data-testid="stHeader"] {
    color: var(--ec-text) !important;
  }

  .stCaption, [data-testid="stCaptionContainer"] {
    color: var(--ec-muted) !important;
  }

  h1, h2, h3, h4, .stSubheader {
    color: var(--ec-text) !important;
  }

  /* Inputs: white field, dark typed text */
  .stTextInput input, .stNumberInput input, .stTextArea textarea,
  [data-baseweb="input"] input, [data-baseweb="textarea"] textarea,
  [data-baseweb="select"] > div {
    background-color: var(--ec-surface) !important;
    color: var(--ec-text) !important;
    border-color: var(--ec-border) !important;
  }

  .stChatMessage, [data-testid="stChatMessage"] {
    background-color: var(--ec-surface) !important;
    color: var(--ec-text) !important;
    border: 1px solid var(--ec-border);
  }

  section[data-testid="stSidebar"] {
    background-color: #e2e8f0 !important;
  }
  section[data-testid="stSidebar"] * {
    color: var(--ec-text) !important;
  }

  .hero-card {
    background: var(--ec-surface);
    border: 1px solid var(--ec-border);
    border-radius: 14px;
    padding: 1.35rem 1.5rem;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
    margin-bottom: 1rem;
  }
  .hero-card h1 {
    margin: 0 0 0.35rem 0;
    font-size: 1.85rem;
    color: var(--ec-text) !important;
  }
  .hero-card p {
    margin: 0;
    color: var(--ec-muted) !important;
  }

  .role-pill {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 700;
    margin-top: 0.6rem;
  }
  .role-coach { background: #bfdbfe; color: #1e3a8a !important; }
  .role-learner { background: #bbf7d0; color: #14532d !important; }

  .metric-strip {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin: 0.75rem 0 1rem 0;
  }
  .metric-chip {
    background: var(--ec-surface);
    border: 1px solid var(--ec-border);
    border-radius: 12px;
    padding: 0.65rem 0.9rem;
    min-width: 120px;
  }
  .metric-chip .label {
    color: var(--ec-muted) !important;
    font-size: 0.75rem;
    font-weight: 600;
  }
  .metric-chip .value {
    color: var(--ec-text) !important;
    font-size: 1.15rem;
    font-weight: 700;
  }

  /* Info / warning boxes: keep readable dark copy */
  div[data-testid="stAlert"] {
    color: var(--ec-text) !important;
  }
</style>
"""


def api_get(path: str, **params: Any) -> dict[str, Any]:
    with httpx.Client(timeout=120.0) as client:
        response = client.get(f"{API_URL}{path}", params=params or None)
        response.raise_for_status()
        return response.json()


def api_post(path: str, payload: dict[str, Any]) -> dict[str, Any]:
    with httpx.Client(timeout=120.0) as client:
        response = client.post(f"{API_URL}{path}", json=payload)
        response.raise_for_status()
        return response.json()


def _current_user() -> User | None:
    raw = st.session_state.get("auth_user")
    if not isinstance(raw, dict):
        return None
    try:
        return User(**raw)
    except TypeError:
        return None


def _login(user: User) -> None:
    st.session_state["auth_user"] = {
        "username": user.username,
        "role": user.role,
        "display_name": user.display_name,
        "student_id": user.student_id,
    }


def _logout() -> None:
    keys = [k for k in st.session_state.keys() if k.startswith("chat_history_")]
    for key in keys:
        del st.session_state[key]
    st.session_state.pop("auth_user", None)
    st.session_state.pop("risk_board", None)


def _sidebar_chrome(user: User) -> None:
    with st.sidebar:
        st.markdown(f"**{user.display_name}**")
        st.caption(f"@{user.username}")
        role_class = "role-coach" if user.role == "coach" else "role-learner"
        st.markdown(
            f'<span class="role-pill {role_class}">{user.role.upper()}</span>',
            unsafe_allow_html=True,
        )
        st.divider()
        st.caption(f"API · {API_URL}")
        if st.button("Log out", use_container_width=True):
            _logout()
            st.rerun()


def render_login() -> None:
    st.markdown(
        """
        <div class="hero-card">
          <h1>EduCoach AI</h1>
          <p>Sign in to open your workspace — coaches see risk, learners get tutoring.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

    left, right = st.columns([1.1, 0.9], gap="large")
    with left:
        st.subheader("Sign in")
        with st.form("login_form", clear_on_submit=False):
            username = st.text_input("Username", placeholder="coach or student12")
            password = st.text_input("Password", type="password")
            submitted = st.form_submit_button("Enter dashboard", type="primary")

        if submitted:
            user = authenticate(username, password)
            if user is None:
                st.error("Invalid username or password.")
            else:
                _login(user)
                st.success(f"Welcome, {user.display_name}!")
                st.rerun()

    with right:
        st.subheader("Demo accounts")
        st.info(demo_credentials_hint())
        st.markdown(
            """
            After login:
            - **Coach** → evening risk board + live alerts  
            - **Learner** → personal tutor chat (your student id only)
            """
        )


def _fetch_student_features(student_id: str, day: int | None = None) -> dict[str, Any]:
    """Pull one learner's activity row from the risk board for chat features."""
    params: dict[str, Any] = {}
    if day is not None:
        params["day"] = day
    board = api_get("/coach/risk_board", **params)
    match = next(
        (s for s in board["students"] if s["student_id"] == str(student_id)),
        None,
    )
    features = {
        "day": board["day"],
        "topic": board["topic"],
        "exercises_attempted": 5,
        "exercises_solved_correctly": 2,
        "hints_used": 8,
        "time_spent_minutes": 70.0,
        "previous_eval_score": 8.0,
    }
    if match:
        features.update(
            {
                "exercises_solved_correctly": match["exercises_solved_correctly"],
                "hints_used": match["hints_used"],
                "previous_eval_score": match["previous_eval_score"],
            }
        )
    return features


def render_coach_dashboard(user: User) -> None:
    _sidebar_chrome(user)
    st.markdown(
        """
        <div class="hero-card">
          <h1>Coach dashboard</h1>
          <p>Rank learners by predicted evening-eval risk and act on tutor alerts.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

    col_day, col_btn, _ = st.columns([1, 1, 2])
    with col_day:
        day = st.number_input("SAS day", min_value=1, max_value=20, value=11)
    with col_btn:
        st.write("")
        st.write("")
        refresh = st.button("Refresh risk board", type="primary", use_container_width=True)

    if refresh:
        try:
            st.session_state["risk_board"] = api_get("/coach/risk_board", day=int(day))
        except Exception as exc:  # noqa: BLE001
            st.error(f"Could not load risk board: {exc}")

    board = st.session_state.get("risk_board")
    if board:
        students = board["students"]
        at_risk_n = sum(1 for s in students if s["at_risk"])
        ok_n = len(students) - at_risk_n
        avg_pred = sum(s["predicted_score"] for s in students) / max(len(students), 1)

        st.markdown(
            f"""
            <div class="metric-strip">
              <div class="metric-chip"><div class="label">Day / topic</div>
                <div class="value">{board['day']} · {board['topic']}</div></div>
              <div class="metric-chip"><div class="label">At risk</div>
                <div class="value">{at_risk_n} / {len(students)}</div></div>
              <div class="metric-chip"><div class="label">On track</div>
                <div class="value">{ok_n}</div></div>
              <div class="metric-chip"><div class="label">Avg predicted</div>
                <div class="value">{avg_pred:.1f}/20</div></div>
            </div>
            """,
            unsafe_allow_html=True,
        )

        filter_mode = st.radio(
            "Show",
            options=["All", "At-risk only", "On-track only"],
            horizontal=True,
        )
        filtered = students
        if filter_mode == "At-risk only":
            filtered = [s for s in students if s["at_risk"]]
        elif filter_mode == "On-track only":
            filtered = [s for s in students if not s["at_risk"]]

        rows = [
            {
                "Student": s["student_id"],
                "Solved": s["exercises_solved_correctly"],
                "Hints": s["hints_used"],
                "Prev score": s["previous_eval_score"],
                "Predicted /20": s["predicted_score"],
                "Status": "🔴 at-risk" if s["at_risk"] else "🟢 ok",
            }
            for s in filtered
        ]
        st.dataframe(pd.DataFrame(rows), use_container_width=True, hide_index=True)

        chart_df = pd.DataFrame(
            {
                "student": [s["student_id"] for s in filtered],
                "predicted_score": [s["predicted_score"] for s in filtered],
            }
        )
        if not chart_df.empty:
            st.bar_chart(chart_df.set_index("student"))

        selected = st.selectbox(
            "Inspect learner",
            options=[s["student_id"] for s in filtered] or [s["student_id"] for s in students],
        )
        detail = next(s for s in students if s["student_id"] == selected)
        c1, c2, c3 = st.columns(3)
        c1.metric("Predicted score", f"{detail['predicted_score']:.1f}/20")
        c2.metric("Hints used", detail["hints_used"])
        c3.metric(
            "Suggestion",
            "1:1 coaching" if detail["at_risk"] else "Monitor",
        )
    else:
        st.info("Pick a day and refresh to load the 24-learner risk board.")

    st.divider()
    st.subheader("Live coach alerts")
    st.caption("Filled when a learner chats with activity features and is predicted at-risk.")
    if st.button("Refresh alerts"):
        st.session_state.pop("coach_alerts_cache", None)

    try:
        payload = api_get("/coach/alerts", limit=15)
        alerts = payload.get("alerts", [])
        st.session_state["coach_alerts_cache"] = alerts
    except Exception as exc:  # noqa: BLE001
        alerts = st.session_state.get("coach_alerts_cache", [])
        st.warning(f"Alerts API unavailable ({exc}). Showing cached list if any.")

    if not alerts:
        st.info("No alerts yet. Have an at-risk learner send a chat with features attached.")
    else:
        for item in alerts:
            ts = item.get("timestamp", "")
            try:
                nice = datetime.fromisoformat(ts.replace("Z", "+00:00")).strftime(
                    "%Y-%m-%d %H:%M UTC"
                )
            except ValueError:
                nice = ts
            st.warning(f"**Student {item.get('student_id')}** · {nice}  \n{item.get('message')}")


def render_learner_dashboard(user: User) -> None:
    _sidebar_chrome(user)
    student_id = user.student_id or "1"

    st.markdown(
        f"""
        <div class="hero-card">
          <h1>Hi, {user.display_name}</h1>
          <p>Ask concept questions or debugging help. Your coach may get a silent risk alert — you only see tutoring.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

    with st.expander("Today's activity sent with each message", expanded=False):
        use_live = st.checkbox("Load my activity from the risk board", value=True)
        defaults = {
            "day": 11,
            "topic": "final_project",
            "exercises_attempted": 5,
            "exercises_solved_correctly": 2,
            "hints_used": 8,
            "time_spent_minutes": 70.0,
            "previous_eval_score": 8.0,
        }
        if use_live:
            try:
                defaults.update(_fetch_student_features(student_id))
            except Exception as exc:  # noqa: BLE001
                st.caption(f"Could not prefill from API ({exc}); using defaults.")

        f_day = st.number_input("day", 1, 20, int(defaults["day"]))
        f_topic = st.text_input("topic", str(defaults["topic"]))
        f_attempted = st.number_input("exercises_attempted", 0, 50, int(defaults["exercises_attempted"]))
        f_solved = st.number_input(
            "exercises_solved_correctly", 0, 50, int(defaults["exercises_solved_correctly"])
        )
        f_hints = st.number_input("hints_used", 0, 50, int(defaults["hints_used"]))
        f_time = st.number_input(
            "time_spent_minutes", 0.0, 300.0, float(defaults["time_spent_minutes"])
        )
        f_prev = st.number_input(
            "previous_eval_score", 0.0, 20.0, float(defaults["previous_eval_score"])
        )
        attach_features = st.checkbox("Send activity features with chat", value=True)

    tips = st.columns(3)
    tips[0].info("Theory → Concept Tutor (RAG)")
    tips[1].info("Bugs / code → hint-only Helper")
    tips[2].info("No full solutions — learn by doing")

    history_key = f"chat_history_{student_id}"
    if history_key not in st.session_state:
        st.session_state[history_key] = []

    for turn in st.session_state[history_key]:
        with st.chat_message(turn["role"]):
            st.markdown(turn["content"])

    prompt = st.chat_input("Ask about today's lesson or paste a bug…")
    if prompt:
        st.session_state[history_key].append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)

        payload: dict[str, Any] = {
            "student_id": student_id,
            "message": prompt,
        }
        if attach_features:
            payload["features"] = {
                "day": int(f_day),
                "topic": f_topic,
                "exercises_attempted": int(f_attempted),
                "exercises_solved_correctly": int(f_solved),
                "hints_used": int(f_hints),
                "time_spent_minutes": float(f_time),
                "previous_eval_score": float(f_prev),
            }

        try:
            with st.spinner("EduCoach is thinking…"):
                result = api_post("/chat", payload)
            reply = result.get("reply", "")
            st.session_state[history_key].append({"role": "assistant", "content": reply})
            with st.chat_message("assistant"):
                st.markdown(reply)
                meta = []
                if result.get("route"):
                    meta.append(f"routed to **{result['route']}**")
                if result.get("blocked"):
                    meta.append(f"blocked (`{result.get('block_reason')}`)")
                if meta:
                    st.caption(" · ".join(meta))
            # Intentionally do not show coach_alert / predicted_score to the learner.
        except Exception as exc:  # noqa: BLE001
            st.error(f"Chat failed: {exc}")


def main() -> None:
    st.set_page_config(
        page_title="EduCoach AI",
        page_icon="🎓",
        layout="wide",
        initial_sidebar_state="expanded",
    )
    st.markdown(CUSTOM_CSS, unsafe_allow_html=True)

    user = _current_user()
    if user is None:
        render_login()
        return

    if user.role == "coach":
        render_coach_dashboard(user)
    else:
        render_learner_dashboard(user)


main()