// rubrics_data.js
// Edit cases/vignettes/rubrics/items here. Run: python3 build.py to rebuild.

const h = React.createElement;
const { useState, useCallback, createContext, useContext } = React;

// ─── SUPABASE ────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://qydinydhytepqptcvslb.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5ZGlueWRoeXRlcHFwdGN2c2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4Mjk0NTUsImV4cCI6MjA5MDQwNTQ1NX0.ZniqFMfctWHgbA4dJSlrvlFxWRcRfCrVuA9S3gjcA5o";

// ─── LANGUAGE CONTEXT ────────────────────────────────────────────────────────
const LangCtx = createContext("en");
const useLang = () => useContext(LangCtx);
const T = (en, ko, lang) => lang === "ko" ? ko : en;

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const navy    = "#1B2B5E";
const navyMid = "#2D4A8A";
const navyL   = "#EEF2F8";
const navyBd  = "#C5D2E8";
const white   = "#FFFFFF";
const pageBg  = "#F0F3F8";
const cardBd  = "#DDE4EF";
const txt     = "#1A2340";
const muted   = "#6B7A99";
const green   = "#16A34A";
const greenBg = "#F0FDF4";
const greenBd = "#86EFAC";
const red     = "#DC2626";
const redBg   = "#FEF2F2";
const redBd   = "#FECACA";
const amber   = "#92400e";
const amberBg = "#FFFBEB";
const amberBd = "#FCD34D";
const ff      = "'Segoe UI',system-ui,-apple-system,sans-serif";
const ffs     = ff;


// ─── SURVEY CONTENT ──────────────────────────────────────────────────────────
const CASES = [
  {
    id: 1,
    en: "Case 1: Young child with fever, abdominal pain, and dysuria — acute urinary tract infection (pyelonephritis likely)",
    ko: "사례 1: 발열, 복통, 배뇨통을 호소하는 어린 아동 — 급성 요로감염 (신우신염 의심)",
    vignette: {
      rows: [
        { en:"Chief Complaint", ko:"주 호소", val_en:"Fever with abdominal pain and painful urination", val_ko:"복통 및 배뇨통을 동반한 발열" },
        { en:"History of Presenting Illness", ko:"현병력", val_en:"6-year-old girl with 2 days of high fevers up to 39.5°C, suprapubic pain, and dysuria. Increased urinary frequency and urgency. Reports right-sided back pain since this morning. No vomiting or diarrhea. No prior UTIs.", val_ko:"6세 여아로 2일간 39.5°C까지 고열, 치골상부 통증, 배뇨통 호소. 빈뇨 및 요절박 증가. 오늘 아침부터 우측 허리 통증 호소. 구토나 설사 없음. 이전 요로감염 병력 없음." },
        { en:"Past Medical History", ko:"과거 병력", val_en:"Unremarkable; no known urinary tract anomalies.", val_ko:"특이사항 없음; 알려진 요로 기형 없음." },
        { en:"Medications/Allergies", ko:"복용 약물/알레르기", val_en:"No chronic meds. No known drug allergies.", val_ko:"만성 복용 약물 없음. 알려진 약물 알레르기 없음." },
        { en:"Immunizations", ko:"예방접종", val_en:"Up to date.", val_ko:"접종 완료." },
        { en:"Social/Family History", ko:"사회력/가족력", val_en:"Lives with parents; no family history of renal disease. Toilet-trained, sometimes postpones voiding at school.", val_ko:"부모와 거주. 신장 질환 가족력 없음. 배변 훈련 완료되었으나 학교에서 소변을 참는 경우가 있음." },
        { en:"Review of Systems", ko:"계통별 문진", val_en:"Positive for fever, dysuria, frequency, urgency, suprapubic and right flank pain. Negative for cough, sore throat, abdominal distention, or rash.", val_ko:"발열, 배뇨통, 빈뇨, 요절박, 치골상부 통증, 우측 옆구리 통증 있음. 기침, 인후통, 복부 팽만, 발진 없음." },
      ],
      vitals: [
        { en:"Age", ko:"연령", val_en:"6 years", val_ko:"6세" },
        { en:"Temperature", ko:"체온", val_en:"39.2°C (36.5–37.5°C)", val_ko:"39.2°C (36.5–37.5°C)" },
        { en:"Heart rate", ko:"심박수", val_en:"132 bpm (75–115 bpm)", val_ko:"132 bpm (75–115 bpm)" },
        { en:"Respiratory rate", ko:"호흡수", val_en:"24 breaths/min (18–28 breaths/min)", val_ko:"24회/분 (18–28회/분)" },
        { en:"Blood pressure", ko:"혈압", val_en:"98/60 mmHg (95–110/55–75 mmHg)", val_ko:"98/60 mmHg (95–110/55–75 mmHg)" },
        { en:"SpO₂", ko:"SpO₂", val_en:"99% on room air (≥95%)", val_ko:"99% 실내 공기 (≥95%)" },
        { en:"Weight", ko:"체중", val_en:"19.5 kg", val_ko:"19.5 kg" },
      ],
      exam: [
        { en:"General", ko:"전반", val_en:"Febrile, mildly ill-appearing; well perfused", val_ko:"발열, 경미한 병색; 말초순환 양호" },
        { en:"Abdomen", ko:"복부", val_en:"Soft; suprapubic tenderness without guarding or rebound", val_ko:"부드러움; 치골상부 압통, 근육 경직 및 반발통 없음" },
        { en:"Back", ko:"등", val_en:"Right costovertebral angle tenderness present", val_ko:"우측 늑골척추각 압통 있음" },
        { en:"HEENT", ko:"HEENT", val_en:"Moist mucous membranes; no pharyngitis", val_ko:"점막 습윤; 인두염 없음" },
        { en:"Respiratory", ko:"호흡기", val_en:"Clear breath sounds; normal effort", val_ko:"호흡음 깨끗; 정상 호흡 노력" },
        { en:"Cardiovascular", ko:"심혈관", val_en:"Tachycardic with regular rhythm; no murmurs", val_ko:"빈맥, 규칙적 리듬; 잡음 없음" },
        { en:"Skin", ko:"피부", val_en:"No rash", val_ko:"발진 없음" },
        { en:"Neuro", ko:"신경", val_en:"Alert, interactive; no focal deficits", val_ko:"각성, 반응적; 국소 신경학적 결손 없음" },
      ],
    },
    rubrics: [
      {
        id:"1-1", label_en:"Rubric 1", label_ko:"기준표 1", d1pts:40, d2pts:60,
        threshold_en:"Pass Threshold: 70/100. Must score at least 10/20 on Item 2.1 (Pyelonephritis Screen) to pass, as missing this compromises patient safety.",
        threshold_ko:"합격 기준: 70점. 항목 2.1 (신우신염 선별)에서 최소 10/20점 이상 획득 필요. 이를 놓치면 환자 안전이 위협됨.",
        d1desc_en:"This domain evaluates the candidate's ability to structure the interview, build rapport with both the child and parent, and gather standard medical context applicable to any pediatric admission.",
        d1desc_ko:"이 영역은 응시자의 면담 구조화 능력, 아동 및 보호자와의 신뢰 형성 능력, 모든 소아 입원에 적용 가능한 표준 의학적 맥락 수집 능력을 평가합니다.",
        d2desc_en:"This domain evaluates the candidate's clinical reasoning, specifically their ability to differentiate lower vs. upper tract infection, assess hydration status, and screen for predisposing functional factors.",
        d2desc_ko:"이 영역은 응시자의 임상 추론 능력, 특히 하부 vs. 상부 요로감염 구별, 수분 상태 평가, 소인이 되는 기능적 요인 선별 능력을 평가합니다.",
        d1:[
          {id:"1-1-1-1",pts:5,en:"Item 1. Introduction and Dyadic Rapport: Introduces self clearly to both parent and child. Establishes an age-appropriate connection with the 6-year-old (e.g., getting on eye level, using simple language) while maintaining professional engagement with the caregiver.",ko:"항목 1. 소개 및 이중 관계 형성: 부모와 아동 모두에게 명확하게 자기소개를 합니다. 6세 아동과 눈높이를 맞추고 쉬운 언어를 사용하는 등 연령에 맞는 방식으로 소통하면서, 보호자와도 전문적인 관계를 유지합니다.",xEn:"In pediatrics, the history is obtained from two sources. Ignoring the child yields poor data regarding subjective pain, while ignoring the parent misses the timeline. 5 points are awarded for establishing the trust necessary to perform a physical exam later.",xKo:"소아과에서 병력은 두 가지 출처에서 얻습니다. 아동을 무시하면 주관적 통증 정보가 부정확해지고, 보호자를 무시하면 발병 경과를 놓치게 됩니다. 5점은 이후 신체 검진을 위한 신뢰 관계 형성에 부여됩니다."},
          {id:"1-1-1-2",pts:10,en:"Item 2. Chronology and Symptom Characterization (HPI Structure): Elicits a clear timeline of illness onset (2 days ago), progression of fever, and the sequence of pain symptoms using a structured approach (e.g., OLDGAR or OPQRST). Clarifies the exact nature of the \"abdominal pain\" (suprapubic vs. generalized).",ko:"항목 2. 시간 경과 및 증상 특성화 (현병력 구조화): 구조화된 접근법(예: OLDCART 또는 OPQRST)을 사용하여 발병 시점(2일 전), 발열 진행 과정, 통증 증상의 순서를 명확히 파악합니다. \"복통\"의 정확한 특성(치골상부 통증 vs. 전반적 통증)을 구분합니다.",xEn:"A disorganized timeline makes it difficult to distinguish an acute infection from a chronic issue or to determine if the child is deteriorating. This carries 10 points as it forms the skeleton of the clinical narrative.",xKo:"비체계적인 시간 경과는 급성 감염과 만성 문제를 구별하거나 악화 여부를 판단하기 어렵게 만듭니다. 임상 서술의 핵심 골격을 형성하므로 10점이 부여됩니다."},
          {id:"1-1-1-3",pts:10,en:"Item 3. Past Medical, Surgical, and Medication History: Specifically asks about previous UTIs, hospitalizations, known renal anomalies (e.g., VUR), current medications, and allergies.",ko:"항목 3. 과거 병력, 수술력 및 약물력: 이전 요로감염, 입원력, 알려진 신장 기형(예: 방광요관역류), 현재 복용 약물, 알레르기에 대해 구체적으로 문진합니다.",xEn:"This is a critical safety check. Missing a history of Vesicoureteral Reflux (VUR) or prior recurrent UTIs drastically changes the management plan (need for renal ultrasound or admission).",xKo:"이것은 중요한 안전 확인 사항입니다. 방광요관역류(VUR) 병력이나 반복성 요로감염을 놓치면 치료 계획(신장 초음파 또는 입원 필요성)이 크게 달라집니다."},
          {id:"1-1-1-4",pts:5,en:"Item 4. Social and Environmental History: Inquires about the living situation, who the primary caregiver is, and school attendance.",ko:"항목 4. 사회력 및 환경력: 거주 환경, 주 보호자, 학교 출석 여부에 대해 문진합니다.",xEn:"Understanding the home environment is necessary to determine if the family can manage a potentially complicated UTI (pyelonephritis) at home with oral antibiotics or if social admission is required.",xKo:"가정 환경을 파악하는 것은 가족이 복잡한 요로감염(신우신염)을 경구 항생제로 가정에서 관리할 수 있는지, 또는 사회적 입원이 필요한지 판단하는 데 필수적입니다."},
          {id:"1-1-1-5",pts:10,en:"Item 5. Communication Technique and Synthesis: Uses open-ended questions initially, followed by closed questions for clarification. Avoids medical jargon. Summarizes findings back to the family to ensure accuracy (\"closed-loop communication\").",ko:"항목 5. 의사소통 기법 및 종합: 처음에는 개방형 질문을 사용한 후 확인을 위해 폐쇄형 질문을 사용합니다. 의학 전문 용어를 피합니다. 가족에게 소견을 요약하여 정확성을 확인합니다(\"폐쇄 루프 의사소통\").",xEn:"This ensures the clinician has correctly interpreted the family's concerns. High points are awarded here because misinterpretation of \"pain\" or \"fever\" frequency can lead to diagnostic errors.",xKo:"이는 임상의가 가족의 우려를 정확히 해석했음을 보장합니다. \"통증\"이나 \"발열\" 빈도의 오해는 진단 오류로 이어질 수 있으므로 높은 점수가 부여됩니다."},
        ],
        d2:[
          {id:"1-1-2-1",pts:20,en:"Item 6. Differentiation of Upper vs. Lower Tract Involvement (Pyelonephritis Screen): Specifically seeks signs of upper tract extension. Asks explicitly about flank/back pain, the height of the fever, rigor/shaking chills, and systemic malaise.",ko:"항목 6. 상부 vs. 하부 요로 침범 구별 (신우신염 선별): 상부 요로 확장 징후를 구체적으로 탐색합니다. 옆구리/허리 통증, 발열 정도, 오한/전율, 전신 권태감에 대해 명시적으로 문진합니다.",xEn:"This is the most critical part of this specific case. The vignette highlights a 6-year-old with high fever and new back pain. The clinician must recognize this as likely pyelonephritis, not simple cystitis. Failure to ask about back pain implies a failure to recognize the severity of the diagnosis.",xKo:"이것은 이사례에서 가장 중요한 부분입니다. 사례에서 고열과 새로 나타난 허리 통증이 있는 6세 아동을 다루고 있습니다. 임상의는 이를 단순 방광염이 아닌 신우신염 가능성으로 인식해야 합니다. 허리 통증을 문진하지 않으면 진단의 중증도를 인식하지 못한 것으로 간주됩니다."},
          {id:"1-1-2-2",pts:10,en:"Item 7. Assessment of Hydration and Systemic Stability: Quantifies oral intake (liquids/solids) and output (wet diapers/voiding frequency despite dysuria). Asks about vomiting and activity level (lethargy).",ko:"항목 7. 수분 상태 및 전신 안정성 평가: 경구 섭취량(액체/고형물) 및 배출량(배뇨통에도 불구하고 젖은 기저귀/배뇨 빈도)을 정량화합니다. 구토 및 활동 수준(무기력증)을 문진합니다.",xEn:"Children with pyelonephritis are at risk for dehydration and sepsis. Even if the diagnosis is correct, if the clinician fails to identify that the child is vomiting and cannot tolerate oral antibiotics, the disposition plan will fail.",xKo:"신우신염 환아는 탈수와 패혈증 위험이 있습니다. 진단이 정확하더라도 아이가 구토로 경구 항생제를 복용할 수 없다는 사실을 파악하지 못하면 치료 계획이 실패합니다."},
          {id:"1-1-2-3",pts:15,en:"Item 8. Investigation of Predisposing Functional Factors: Detailed inquiry into voiding and bowel habits. Specifically asks about constipation (stool frequency/consistency), voiding postponement (holding urine at school), and wiping hygiene.",ko:"항목 8. 소인이 되는 기능적 요인 조사: 배뇨 및 배변 습관에 대해 상세히 문진합니다. 변비(배변 빈도/성상), 배뇨 지연(학교에서 소변 참기), 회음부 위생에 대해 구체적으로 문진합니다.",xEn:"In a 6-year-old female, \"functional constipation and voiding postponement\" are the leading causes of UTIs. Identifying this is essential for preventing recurrence. 15 points are awarded because this treats the cause, not just the symptom.",xKo:"6세 여아에서 기능성 변비와 배뇨 지연은 요로감염의 주요 원인입니다. 이를 파악하는 것은 재발 예방에 필수적입니다. 15점은 증상이 아닌 원인을 치료하기 때문에 부여됩니다."},
          {id:"1-1-2-4",pts:10,en:"Item 9. Pertinent Negatives and Broad Differential: Asks questions to rule out other causes of fever and abdominal pain. Specifically: respiratory symptoms (pneumonia), throat pain (strep), diarrhea (gastroenteritis), and vaginal discharge/irritation (vulvovaginitis/foreign body).",ko:"항목 9. 관련 음성 소견 및 광범위한 감별진단: 발열과 복통의 다른 원인을 배제하기 위한 문진을 합니다. 구체적으로: 호흡기 증상(폐렴), 인후통(연쇄구균), 설사(위장염), 질 분비물/자극(외음부질염/이물).",xEn:"\"Abdominal pain and fever\" is a broad presentation. The clinician must demonstrate they have considered lower lobe pneumonia or appendicitis to ensure they aren't anchoring on the UTI too early.",xKo:"\"복통과 발열\"은 광범위한 증상입니다. 임상의는 하엽 폐렴이나 충수염을 고려했음을 보여주어야 요로감염에 너무 일찍 고착되지 않았음을 입증할 수 있습니다."},
          {id:"1-1-2-5",pts:5,en:"Item 10. Family History of Renal Disease: Inquiries about family history of vesicoureteral reflux, childhood UTIs in parents/siblings, or renal failure.",ko:"항목 10. 신장 질환 가족력: 방광요관역류, 부모/형제의 소아기 요로감염, 또는 신부전에 대한 가족력을 문진합니다.",xEn:"Genetic predisposition to VUR is significant. This history influences the decision to pursue imaging (Renal US/VCUG) after the acute infection resolves.",xKo:"VUR에 대한 유전적 소인은 임상적으로 중요합니다. 이 병력은 급성 감염 회복 후 영상검사(신장 초음파/VCUG) 시행 여부 결정에 영향을 미칩니다."},
        ],
      },
      {
        id:"1-2", label_en:"Rubric 2", label_ko:"기준표 2", d1pts:40, d2pts:60,
        threshold_en:"", threshold_ko:"",
        d1desc_en:"This domain evaluates the candidate's ability to obtain a complete, structured general clinical history applicable to any pediatric emergency presentation.",
        d1desc_ko:"이 영역은 모든 소아 응급 상황에 적용 가능한 완전하고 구조화된 일반 임상 병력을 청취하는 능력을 평가합니다.",
        d2desc_en:"This domain evaluates the candidate's clinical reasoning, specifically their ability to identify upper urinary tract involvement, assess severity, and explore modifiable risk factors.",
        d2desc_ko:"이 영역은 응시자의 임상 추론 능력, 특히 상부 요로 침범 파악, 중증도 평가, 수정 가능한 위험 요인 탐색 능력을 평가합니다.",
        d1:[
          {id:"1-2-1-1",pts:8,en:"Item 1. Establishes Chief Concern and Symptom Chronology: Clearly elicits the main concerns (fever, abdominal pain, dysuria) and establishes precise onset, duration, progression, and sequence of symptoms.",ko:"항목 1. 주 호소 및 증상 경과 파악: 주요 증상(발열, 복통, 배뇨통)을 명확히 파악하고 정확한 발병 시점, 기간, 진행 과정, 증상 순서를 확인합니다.",xEn:"A clear timeline is foundational to clinical reasoning in emergency care.",xKo:"응급 치료에서 임상 추론의 기반이 되는 명확한 시간 경과 파악이 핵심입니다."},
          {id:"1-2-1-2",pts:8,en:"Item 2. Characterizes Each Symptom Thoroughly (OPQRST framework where applicable): Explores quality, location, radiation, severity, timing, aggravating/relieving factors for pain; quantifies fever (max temperature, method of measurement, response to antipyretics); clarifies urinary symptoms.",ko:"항목 2. 각 증상의 철저한 특성화 (해당 시 OPQRST 프레임워크 적용): 통증의 성질, 위치, 방사, 중증도, 시점, 악화/완화 요인을 탐색합니다. 발열을 정량화하고(최고 체온, 측정 방법, 해열제 반응), 요로 증상을 명확히 합니다.",xEn:"Detailed symptom analysis improves diagnostic accuracy and distinguishes lower vs upper UTI or alternative diagnoses.",xKo:"세부적인 증상 분석은 진단 정확도를 향상시키고 하부 vs. 상부 요로감염 또는 대체 진단을 구별하는 데 도움이 됩니다."},
          {id:"1-2-1-3",pts:6,en:"Item 3. Assesses Associated and Red-Flag Symptoms: Screens for vomiting, poor oral intake, lethargy, altered mental status, decreased urine output, rash, respiratory symptoms, or signs of sepsis.",ko:"항목 3. 동반 증상 및 적신호 증상 평가: 구토, 경구 섭취 불량, 무기력, 의식 변화, 소변량 감소, 발진, 호흡기 증상, 또는 패혈증 징후를 선별합니다.",xEn:"Identifying red flags is critical in pediatric emergency settings to recognize severe infection or systemic involvement.",xKo:"적신호 증상 파악은 소아 응급 환경에서 중증 감염이나 전신 침범을 인식하는 데 중요합니다."},
          {id:"1-2-1-4",pts:4,en:"Item 4. Past Medical, Birth, and Developmental History: Reviews prior illnesses, hospitalizations, known anomalies, prior urinary issues, growth and developmental status.",ko:"항목 4. 과거 병력, 출생력 및 발달력: 과거 질환, 입원력, 알려진 기형, 과거 요로 문제, 성장 및 발달 상태를 검토합니다.",xEn:"Baseline health and prior conditions influence risk stratification and management decisions.",xKo:"기본적인 건강 상태와 과거 질환은 위험도 평가와 치료 결정에 영향을 미칩니다."},
          {id:"1-2-1-5",pts:4,en:"Item 5. Medication and Allergy History: Identifies current/recent medications (including antipyretics or antibiotics) and drug allergies.",ko:"항목 5. 약물 및 알레르기력: 현재/최근 복용 약물(해열제 또는 항생제 포함) 및 약물 알레르기를 확인합니다.",xEn:"Essential for safe prescribing, particularly if parenteral antibiotics may be required.",xKo:"비경구 항생제가 필요할 수 있는 경우 안전한 처방을 위해 필수적입니다."},
          {id:"1-2-1-6",pts:2,en:"Item 6. Immunization Status: Confirms vaccination history.",ko:"항목 6. 예방접종력: 접종 이력을 확인합니다.",xEn:"While less central in this case, immunization status contributes to overall infection risk assessment.",xKo:"이사례에서는 덜 중심적이지만, 예방접종력은 전반적인 감염 위험 평가에 기여합니다."},
          {id:"1-2-1-7",pts:4,en:"Item 7. Family and Social History: Assesses family history of renal/urologic disease and relevant social factors (toilet habits, school behaviors, hygiene, possible stressors).",ko:"항목 7. 가족력 및 사회력: 신장/비뇨기과 질환 가족력 및 관련 사회적 요인(배뇨 습관, 학교에서의 행동, 위생 상태, 가능한 스트레스 요인 등)을 확인합니다.",xEn:"Social and familial context may identify risk factors (voiding postponement, genetic predisposition).",xKo:"사회적 및 가족적 맥락은 위험 요인(배뇨 지연, 유전적 소인)을 파악하는 데 도움이 됩니다."},
          {id:"1-2-1-8",pts:4,en:"Item 8. Structured Review of Systems: Performs a focused but systematic ROS to detect alternative sources of fever (respiratory, gastrointestinal, dermatologic, neurologic).",ko:"항목 8. 구조화된 계통별 문진: 집중적이면서도 체계적인 계통별 문진을 통해 다른 발열 원인(호흡기, 위장관, 피부, 신경계)을 탐색합니다.",xEn:"Prevents premature closure and ensures competing diagnoses are considered.",xKo:"조기 결론을 방지하고 경쟁 진단을 고려할 수 있게 합니다."},
        ],
        d2:[
          {id:"1-2-2-1",pts:12,en:"Item 9. Differentiates Upper vs Lower Urinary Tract Infection: Specifically asks about flank pain, back pain, high-grade fever, chills/rigors, nausea/vomiting, and systemic symptoms.",ko:"항목 9. 상부 vs. 하부 요로감염 구별: 옆구리 통증, 허리 통증, 고열, 오한/전율, 오심/구토, 전신 증상에 대해 구체적으로 문진합니다.",xEn:"Distinguishing cystitis from pyelonephritis determines need for parenteral therapy, imaging, and potential admission.",xKo:"방광염과 신우신염을 구분하면 비경구 치료, 영상검사, 입원 필요성이 결정됩니다."},
          {id:"1-2-2-2",pts:8,en:"Item 10. Evaluates Hydration and Oral Intake: Assesses fluid intake, vomiting, urine output, ability to tolerate oral medications.",ko:"항목 10. 수분 상태 및 경구 섭취 평가: 수분 섭취량, 구토, 소변량, 경구 약물 복용 가능 여부를 평가합니다.",xEn:"Hydration status influences severity assessment and route of antibiotic administration.",xKo:"수분 상태는 중증도 평가와 항생제 투여 경로에 영향을 미칩니다."},
          {id:"1-2-2-3",pts:8,en:"Item 11. Assesses Severity and Sepsis Risk: Screens for lethargy, altered responsiveness, persistent tachycardia, hypotension symptoms, rigors, or decreased perfusion.",ko:"항목 11. 중증도 및 패혈증 위험 평가: 무기력, 반응 변화, 지속적 빈맥, 저혈압 증상, 오한, 또는 관류 감소를 선별합니다.",xEn:"Pyelonephritis can progress to urosepsis; early recognition of systemic compromise is critical in emergency care.",xKo:"신우신염은 요로패혈증으로 진행될 수 있으며, 전신 상태 악화의 조기 인식이 응급 치료에서 중요합니다."},
          {id:"1-2-2-4",pts:8,en:"Item 12. Explores Urinary Pattern and Dysfunction: Clarifies frequency, urgency, incontinence, hesitancy, weak stream, constipation, stool withholding, and voiding postponement behaviors.",ko:"항목 12. 배뇨 양상 및 기능 이상 탐색: 빈뇨, 요절박, 요실금, 요주저, 약한 요류, 변비, 대변 참기, 배뇨 지연 행동을 명확히 합니다.",xEn:"Voiding dysfunction and constipation are key pediatric risk factors for UTI and recurrence.",xKo:"배뇨 기능 이상과 변비는 소아 요로감염 및 재발의 주요 위험 요인입니다."},
          {id:"1-2-2-5",pts:6,en:"Item 13. Prior UTI History and Prior Antibiotic Exposure: Asks about previous urinary infections, prior urine cultures, imaging studies, or recent antibiotic use.",ko:"항목 13. 이전 요로감염력 및 항생제 노출력: 이전 요로감염, 소변 배양 검사, 영상검사, 또는 최근 항생제 사용 여부를 문진합니다.",xEn:"Prior history influences likelihood of structural abnormalities and antibiotic resistance patterns.",xKo:"이전 병력은 구조적 이상 가능성과 항생제 내성 패턴에 영향을 미칩니다."},
          {id:"1-2-2-6",pts:6,en:"Item 14. Assesses for Underlying Urinary Tract Abnormalities: Screens for known reflux, prenatal hydronephrosis, abnormal urinary stream, recurrent unexplained fevers.",ko:"항목 14. 기저 요로 기형 평가: 알려진 역류, 출생 전 수신증, 비정상적 요류, 반복적 원인 불명의 발열을 선별합니다.",xEn:"Structural anomalies significantly affect management and need for follow-up imaging.",xKo:"구조적 이상은 치료 방침과 추적 영상 검사의 필요성에 중요한 영향을 미칩니다."},
          {id:"1-2-2-7",pts:6,en:"Item 15. Screens for Alternative Diagnoses: Evaluates for appendicitis (migration of pain, anorexia), gastroenteritis, vulvovaginitis, trauma, or pelvic pathology.",ko:"항목 15. 감별 진단 선별: 충수염(통증 이동, 식욕 부진), 위장염, 외음부질염, 외상, 또는 골반 병리를 평가합니다.",xEn:"Abdominal pain with fever requires exclusion of surgical and gynecologic mimics.",xKo:"발열을 동반한 복통은 외과적 및 부인과적 유사 질환을 배제해야 합니다."},
          {id:"1-2-2-8",pts:4,en:"Item 16. Hygiene and Perineal Factors: Asks about wiping technique, bubble baths, tight clothing, recent irritation, or possible foreign body.",ko:"항목 16. 위생 및 회음부 요인: 닦기 방법, 거품 목욕, 꽉 끼는 의복, 최근 자극, 또는 이물 가능성을 문진합니다.",xEn:"Perineal hygiene practices are common modifiable contributors to UTI risk in young girls.",xKo:"회음부 위생 습관은 어린 여아의 요로감염 위험에 흔히 수정 가능한 기여 요인입니다."},
          {id:"1-2-2-9",pts:2,en:"Item 17. Recent Illnesses or Hematogenous Sources: Asks about recent skin infections, bacteremia risk, or systemic infections.",ko:"항목 17. 최근 질환 또는 혈행성 원인: 최근 피부 감염, 균혈증 위험, 또는 전신 감염을 문진합니다.",xEn:"Though less common, hematogenous spread can cause renal infection; lower weight but demonstrates comprehensive reasoning.",xKo:"덜 흔하지만 혈행성 전파는 신장 감염을 유발할 수 있습니다. 낮은 가중치이지만 포괄적인 추론을 보여줍니다."},
        ],
      },
      {
        id:"1-3", label_en:"Rubric 3", label_ko:"기준표 3", d1pts:40, d2pts:60,
        threshold_en:"", threshold_ko:"",
        rationale_en:"Design Rationale for Domain Weighting: Domain 2 is weighted more heavily (60/40 split) because in an emergency assessment, case-specific diagnostic reasoning — particularly the ability to distinguish pyelonephritis from cystitis, identify structural risk factors, and exclude dangerous differentials — is what most directly determines patient outcome. The general history elements in Domain 1 remain essential but serve a supporting rather than discriminating role in evaluating clinical competence for this scenario.",
        rationale_ko:"영역 가중치 설계 근거: 응급 평가에서는 증례 특이적 진단 추론이 환자 결과에 가장 직접적인 영향을 미치므로 영역 2에 더 높은 가중치(60/40)를 부여하였습니다. 특히 신우신염과 방광염을 구분하고, 구조적 위험 요인을 파악하며, 위험한 감별 진단을 배제하는 능력이 중요합니다. 영역 1의 일반 병력 청취 요소들도 여전히 필수적이지만, 이 시나리오에서 임상 역량을 평가할 때는 구별적인 역할보다는 보조적인 역할을 담당합니다.",
        d1desc_en:"This domain evaluates the candidate's ability to conduct a comprehensive general clinical history, demonstrating organized and patient-centered communication skills.",
        d1desc_ko:"이 영역은 체계적이고 환자 중심적인 의사소통 기술을 발휘하여 포괄적인 일반 임상 병력을 청취하는 응시자의 능력을 평가합니다.",
        d2desc_en:"This domain evaluates case-specific diagnostic reasoning for pediatric febrile UTI/pyelonephritis, with emphasis on distinguishing upper from lower tract disease and identifying modifiable risk factors.",
        d2desc_ko:"이 영역은 소아 발열성 요로감염/신우신염에 대한 사례 특이적 진단 추론을 평가하며, 상부 대 하부 요로 질환 구별 및 수정 가능한 위험 요인 파악에 중점을 둡니다.",
        d1:[
          {id:"1-3-1-1",pts:8,en:"Item 1. Presenting Complaint Characterization: Systematic exploration of each presenting symptom (fever, abdominal pain, dysuria) including onset, duration, severity, progression, and aggravating/relieving factors.",ko:"항목 1. 호소 증상 특성화: 각 호소 증상(발열, 복통, 배뇨통)의 발병 시점, 기간, 중증도, 진행 과정, 악화/완화 요인을 체계적으로 탐색합니다.",xEn:"Thorough characterization of the chief complaint is foundational to all clinical reasoning. This receives high weighting as it anchors the entire history.",xKo:"주 호소 증상의 철저한 특성화는 모든 임상 추론의 기초입니다. 전체 병력 청취의 기준점이 되므로 높은 가중치를 부여합니다."},
          {id:"1-3-1-2",pts:5,en:"Item 2. Past Medical History: Inquiry into prior illnesses, hospitalizations, surgeries, chronic conditions, and prior similar episodes.",ko:"항목 2. 과거 병력: 과거 질환, 입원, 수술, 만성 질환, 이전 유사 에피소드를 문진합니다.",xEn:"Pre-existing conditions (e.g., known vesicoureteral reflux, prior renal anomalies, recurrent infections) fundamentally alter the risk profile and management approach.",xKo:"기존 질환(예: 알려진 방광요관역류, 이전 신장 기형, 반복 감염)은 위험 프로파일과 치료 접근 방식을 근본적으로 변경합니다."},
          {id:"1-3-1-3",pts:5,en:"Item 3. Medication and Allergy History: Current medications, recent antibiotic use, and documented drug allergies including reaction type.",ko:"항목 3. 약물 및 알레르기력: 현재 복용 약물, 최근 항생제 사용, 반응 유형을 포함한 약물 알레르기 기록.",xEn:"Recent antibiotic exposure influences empiric treatment choices and resistance patterns.",xKo:"최근 항생제 노출은 경험적 치료 선택과 내성 패턴에 영향을 미칩니다."},
          {id:"1-3-1-4",pts:2,en:"Item 4. Immunization Status: Confirmation of vaccination history.",ko:"항목 4. 예방접종력: 접종 이력을 확인합니다.",xEn:"While less directly relevant to UTI management, immunization status is a standard pediatric history element.",xKo:"요로감염 관리와 직접적인 관련은 적지만, 예방접종력은 표준 소아 병력 항목입니다."},
          {id:"1-3-1-5",pts:4,en:"Item 5. Birth and Developmental History: Inquiry into perinatal history (including antenatal scans), developmental milestones, and continence milestones.",ko:"항목 5. 출생력 및 발달력: 산전 병력(태아 초음파 포함), 발달 이정표, 배변 훈련 이정표를 문진합니다.",xEn:"Antenatal ultrasound findings (e.g., hydronephrosis) may indicate underlying urological anomalies predisposing to UTI.",xKo:"태아 초음파 소견(예: 수신증)은 요로감염의 소인이 되는 비뇨기 기형을 시사할 수 있습니다."},
          {id:"1-3-1-6",pts:4,en:"Item 6. Social and Family History: Household composition, school attendance, family history of relevant conditions, and any safeguarding considerations.",ko:"항목 6. 사회력 및 가족력: 가구 구성, 학교 출석, 관련 질환 가족력, 및 아동 보호 고려사항.",xEn:"Family history of renal disease or vesicoureteral reflux has direct diagnostic implications.",xKo:"신장 질환 또는 방광요관역류의 가족력은 직접적인 진단적 함의가 있습니다."},
          {id:"1-3-1-7",pts:5,en:"Item 7. Review of Systems: Structured screening of systems not already covered by the presenting complaint to identify missed pathology or red flags.",ko:"항목 7. 계통별 문진: 누락된 병리나 적신호를 식별하기 위해 호소 증상에서 아직 다루지 않은 계통에 대해 구조화된 선별 문진을 합니다.",xEn:"A targeted review of systems ensures the clinician has not anchored prematurely.",xKo:"계통별 문진은 임상의가 조기에 한 진단에 고착되지 않도록 보장합니다."},
          {id:"1-3-1-8",pts:4,en:"Item 8. Fluid Intake and Hydration Assessment: Inquiry into oral fluid intake, urine output, and signs of dehydration (tears, wet nappies/voiding frequency, activity level).",ko:"항목 8. 수분 섭취 및 수분 상태 평가: 경구 수분 섭취, 소변량, 탈수 징후(눈물, 젖은 기저귀/배뇨 빈도, 활동 수준)를 문진합니다.",xEn:"Hydration status directly informs the decision between oral and intravenous management in the emergency department.",xKo:"수분 상태는 응급실에서 경구 또는 정맥 내 치료 결정에 직접적인 영향을 미칩니다."},
          {id:"1-3-1-9",pts:3,en:"Item 9. Structured and Organized Approach: History is obtained in a logical sequence, is comprehensive without being disorganized, and demonstrates clear clinical reasoning.",ko:"항목 9. 구조화되고 체계적인 접근: 논리적 순서로 병력을 청취하고, 혼란 없이 포괄적이며 명확한 임상 추론을 보입니다.",xEn:"The quality of history taking is not only about content but process.",xKo:"병력 청취의 질은 내용뿐만 아니라 과정에 관한 것입니다."},
        ],
        d2:[
          {id:"1-3-2-1",pts:12,en:"Item 10. Urinary Symptom Characterization: Detailed inquiry into dysuria (onset, severity), frequency, urgency, incontinence (new-onset), hematuria, urine color/odor changes, and straining.",ko:"항목 10. 요로 증상 특성화: 배뇨통(발병 시점, 중증도), 빈뇨, 요절박, 요실금(신규 발생), 혈뇨, 소변 색/냄새 변화, 배뇨 시 힘주기에 대해 상세히 문진합니다.",xEn:"This is the single most important diagnostic line of questioning for this presentation. This receives the highest individual weighting in the rubric.",xKo:"이것은 이 증상에 대한 가장 중요한 진단 문진입니다. 기준표에서 개별 항목 중 가장 높은 가중치를 받습니다."},
          {id:"1-3-2-2",pts:10,en:"Item 11. Features Distinguishing Upper from Lower UTI: Specific inquiry into flank/back pain, rigors, high-grade or persistent fever, malaise, vomiting, and poor oral intake.",ko:"항목 11. 상부 vs. 하부 요로감염 구별 특징: 옆구리/허리 통증, 전율, 고열 또는 지속적 발열, 권태감, 구토, 경구 섭취 불량에 대해 구체적으로 문진합니다.",xEn:"The critical clinical decision in this case is whether the presentation suggests pyelonephritis versus simple cystitis.",xKo:"이사례의 핵심 임상 결정은 신우신염인지 단순 방광염인지 여부입니다."},
          {id:"1-3-2-3",pts:8,en:"Item 12. Prior UTI and Urological History: History of previous UTIs (number, frequency, culture results), prior renal imaging, known vesicoureteral reflux, renal anomalies, or urological interventions.",ko:"항목 12. 이전 요로감염 및 비뇨기과력: 이전 요로감염(횟수, 빈도, 배양 결과), 이전 신장 영상검사, 알려진 방광요관역류, 신장 기형, 또는 비뇨기과 시술 병력.",xEn:"Recurrent UTI in a young child raises suspicion for underlying structural or functional abnormality.",xKo:"어린 아이의 재발성 요로감염은 기저 구조적 또는 기능적 이상을 의심하게 합니다."},
          {id:"1-3-2-4",pts:8,en:"Item 13. Voiding Habits and Bowel Function: Inquiry into voiding frequency, postponement behaviors, incomplete emptying, fluid intake habits, constipation, and encopresis.",ko:"항목 13. 배뇨 습관 및 배변 기능: 배뇨 빈도, 지연 행동, 불완전 배뇨, 수분 섭취 습관, 변비, 유분증을 문진합니다.",xEn:"Dysfunctional voiding and constipation are among the most common modifiable risk factors for pediatric UTI.",xKo:"기능성 배뇨 장애와 변비는 소아 요로감염에서 가장 흔한 수정 가능한 위험 요인입니다."},
          {id:"1-3-2-5",pts:7,en:"Item 14. Fever Pattern and Systemic Illness Assessment: Duration, peak temperature, response to antipyretics, associated rigors, lethargy, irritability, appetite changes, and overall activity level.",ko:"항목 14. 발열 패턴 및 전신 질환 평가: 기간, 최고 체온, 해열제 반응, 동반 전율, 무기력, 과민성, 식욕 변화, 전반적 활동 수준.",xEn:"The fever pattern helps gauge severity and risk of bacteremia or sepsis.",xKo:"발열 패턴은 중증도와 균혈증 또는 패혈증 위험을 평가하는 데 도움이 됩니다."},
          {id:"1-3-2-6",pts:7,en:"Item 15. Differential Diagnosis–Oriented Questioning: Targeted questions to exclude appendicitis (migration of pain, vomiting, anorexia), gynecological causes (vaginal discharge, irritation), nephrolithiasis (colicky pain, hematuria), and other causes of acute abdomen.",ko:"항목 15. 감별 진단 지향적 문진: 충수염(통증 이동, 구토, 식욕 부진), 부인과적 원인(질 분비물, 자극), 신장 결석(산통성 통증, 혈뇨), 기타 급성 복부 원인을 배제하기 위한 목표 질문.",xEn:"A 6-year-old girl with fever, abdominal pain, and back pain has a differential that extends beyond UTI.",xKo:"발열, 복통, 허리 통증이 있는 6세 여아의 감별 진단은 요로감염을 넘어섭니다."},
          {id:"1-3-2-7",pts:5,en:"Item 16. Genital Hygiene and Exposure History: Inquiry into bathing practices, use of irritants (bubble baths, soaps), wiping technique, underwear type, and — with appropriate sensitivity — any concerns for abuse or inappropriate contact.",ko:"항목 16. 생식기 위생 및 노출력: 목욕 습관, 자극 물질(거품 목욕, 비누) 사용, 닦기 방법, 속옷 종류, 그리고 적절한 감수성을 갖고 학대나 부적절한 접촉에 대한 우려를 문진합니다.",xEn:"Local irritation can cause dysuria without infection, and hygiene factors contribute to recurrent UTI risk.",xKo:"국소 자극은 감염 없이 배뇨통을 유발할 수 있으며, 위생 요인은 재발성 요로감염 위험에 기여합니다."},
          {id:"1-3-2-8",pts:3,en:"Item 17. Red Flags for Sepsis and Serious Illness: Specific inquiry into altered consciousness, mottled skin, reduced urine output, inconsolability, poor feeding, and rapid clinical deterioration.",ko:"항목 17. 패혈증 및 중증 질환 적신호: 의식 변화, 얼룩덜룩한 피부, 소변량 감소, 달래기 불가, 수유 불량, 급격한 임상 악화에 대해 구체적으로 문진합니다.",xEn:"While this child appears relatively well, any febrile child in the emergency department warrants screening for sepsis red flags.",xKo:"이 아이는 비교적 양호해 보이지만, 응급실의 모든 발열 아이는 패혈증 적신호 선별이 필요합니다."},
        ],
      },
      {
        id:"1-4", label_en:"Rubric 4", label_ko:"기준표 4", d1pts:50, d2pts:50,
        threshold_en:"", threshold_ko:"",
        d1desc_en:"This domain evaluates core history-taking skills applicable across all pediatric emergency presentations.",
        d1desc_ko:"이 영역은 모든 소아 응급 상황에 적용 가능한 핵심 병력 청취 기술을 평가합니다.",
        d2desc_en:"This domain evaluates case-specific diagnostic history for pediatric UTI/pyelonephritis.",
        d2desc_ko:"이 영역은 소아 요로감염/신우신염에 대한 사례 특이적 진단 병력을 평가합니다.",
        d1:[
          {id:"1-4-1-1",pts:5,en:"Item 1. Chief Complaint: Clearly elicits and articulates the primary presenting problem(s) in patient's/family's own words.",ko:"항목 1. 주호소: 환자 또는 보호자의 표현을 그대로 반영하여 주요 호소 증상을 명확히 확인하고 정리합니다.",xEn:"Establishes focus of encounter; foundational for all histories, weighted modestly as routinely expected.",xKo:"진료의 초점을 설정하는 단계로, 모든 병력 청취의 기초가 됩니다. 일상적으로 수행되는 기본 항목이므로 비교적 낮은 가중치를 부여합니다."},
          {id:"1-4-1-2",pts:12,en:"Item 2. History of Presenting Illness: Systematically explores onset, timing, duration, severity, progression, aggravating/alleviating factors, and associated symptoms using a structured approach (e.g., OPQRST).",ko:"항목 2. 현병력: OPQRST와 같은 구조화된 접근을 사용하여 발병 시점, 발생 시기, 지속 기간, 중증도, 진행 양상, 악화/완화 요인, 동반 증상을 체계적으로 탐색합니다.",xEn:"Captures dynamic illness trajectory critical for urgency assessment in EM; highest weight due to centrality in pediatric differentials.",xKo:"응급의학에서 긴급도를 판단하는 데 핵심이 되는 질환의 시간적 경과를 파악합니다. 소아 감별 진단에서 중심적인 역할을 하므로 가장 높은 가중치를 부여합니다."},
          {id:"1-4-1-3",pts:7,en:"Item 3. Past Medical History: Inquires about chronic illnesses, prior hospitalizations, surgeries, developmental milestones, and previous similar episodes.",ko:"항목 3. 과거 병력: 만성 질환, 이전 입원 이력, 수술 이력, 발달 이정표, 과거 유사 증상 발생 여부를 확인합니다.",xEn:"Identifies comorbidities or recurrent patterns affecting management; moderate weight as baseline risk stratification.",xKo:"동반 질환이나 반복되는 질환 양상을 파악하여 치료 계획에 영향을 줄 수 있습니다. 기본적인 위험도 평가를 위해 중간 수준의 가중치를 부여합니다."},
          {id:"1-4-1-4",pts:4,en:"Item 4. Medications: Documents current prescriptions, over-the-counter drugs, recent antibiotics, and adherence.",ko:"항목 4. 약물 복용력: 현재 처방약, 일반의약품, 최근 항생제 사용, 약물 복용 순응도를 확인합니다.",xEn:"Prevents interactions and guides therapy; lower weight as typically straightforward.",xKo:"약물 상호작용을 예방하고 치료 계획을 결정하는 데 도움이 됩니다. 비교적 확인이 간단하므로 낮은 가중치를 부여합니다."},
          {id:"1-4-1-5",pts:4,en:"Item 5. Allergies: Asks about drug/food allergies, adverse reactions, and anaphylaxis history.",ko:"항목 5. 알레르기 병력: 약물 및 음식 알레르기, 이상 반응, 아나필락시스 병력을 확인합니다.",xEn:"Ensures safe prescribing; paired low weight with medications for safety screening.",xKo:"안전한 처방을 위해 필수적인 확인 단계입니다. 약물 복용력과 함께 환자 안전을 위한 선별 항목이므로 낮은 가중치를 부여합니다."},
          {id:"1-4-1-6",pts:4,en:"Item 6. Immunizations: Confirms status, recent vaccines, and any gaps relevant to infectious risks.",ko:"항목 6. 예방접종: 예방접종 상태, 최근 접종 여부, 감염 위험과 관련된 접종 공백 여부를 확인합니다.",xEn:"Essential in pediatrics for outbreak context; low weight as often documented.",xKo:"소아 진료에서 감염병 유행 상황을 고려할 때 중요합니다. 대부분 이미 기록되어 있는 경우가 많으므로 낮은 가중치를 부여합니다."},
          {id:"1-4-1-7",pts:5,en:"Item 7. Family History: Explores hereditary conditions, consanguinity, and relevant familial illnesses.",ko:"항목 7. 가족력: 유전 질환, 근친혼 여부, 관련 가족 질환에 대해 확인합니다.",xEn:"Uncovers genetic risks (e.g., renal disorders); slightly higher for pediatric relevance.",xKo:"신장 질환과 같은 유전적 위험 요인을 확인할 수 있습니다. 소아에서의 관련성을 고려하여 약간 높은 가중치를 부여합니다."},
          {id:"1-4-1-8",pts:4,en:"Item 8. Social History: Assesses home environment, caregivers, school exposure, and basic habits.",ko:"항목 8. 사회력: 가정 환경, 보호자, 학교에서의 노출, 기본적인 생활 습관을 평가합니다.",xEn:"Contextualizes adherence and exposures; low weight as supportive.",xKo:"치료 순응도와 환경적 노출을 이해하는 데 도움이 되는 맥락 정보를 제공합니다. 보조적인 역할이므로 낮은 가중치를 부여합니다."},
          {id:"1-4-1-9",pts:5,en:"Item 9. Review of Systems: Performs age-appropriate screening for unrelated symptoms to avoid missing comorbidities.",ko:"항목 9. 전신 증상 검토: 관련되지 않은 증상을 놓치지 않도록 연령에 적절한 체계적 선별 문진을 시행합니다.",xEn:"Broadens differential; moderate weight for comprehensive safety net.",xKo:"감별 진단의 범위를 넓히는 데 도움이 됩니다. 포괄적인 안전망 역할을 위해 중간 수준의 가중치를 부여합니다."},
        ],
        d2:[
          {id:"1-4-2-1",pts:12,en:"Item 10. Urinary Symptoms: Probes dysuria, frequency, urgency, hematuria, odor, or enuresis in detail.",ko:"항목 10. 배뇨 증상: 배뇨통, 빈뇨, 요절박, 혈뇨, 소변 냄새 변화, 야뇨증 여부 등을 자세히 확인합니다.",xEn:"Hallmark of UTI; highest weight as directly confirms diagnosis and differentiates cystitis vs. pyelonephritis.",xKo:"요로감염의 핵심 증상입니다. 진단을 직접적으로 확인하고 방광염과 신우신염을 구분하는 데 도움이 되므로 가장 높은 가중치를 부여합니다."},
          {id:"1-4-2-2",pts:10,en:"Item 11. Pain Characterization: Localizes abdominal/suprapubic or flank pain, assesses radiation, quality, severity, and timing.",ko:"항목 11. 통증 특성 평가: 복부/치골상부 또는 옆구리 통증의 위치를 확인하고, 방사 여부, 통증의 성질, 중증도, 발생 시점을 평가합니다.",xEn:"Pinpoints pyelonephritis (e.g., CVA tenderness correlate); high weight for localizing infection site.",xKo:"감염의 위치를 파악하는 데 도움이 됩니다(예: 늑골척추각 압통과의 연관성). 감염 부위 확인을 위해 높은 가중치를 부여합니다."},
          {id:"1-4-2-3",pts:8,en:"Item 12. Voiding and Bowel Habits: Inquires about toilet training, postponing urination, constipation, or hygiene practices.",ko:"항목 12. 배뇨 및 배변 습관: 배변 훈련 여부, 배뇨를 미루는 습관, 변비, 위생 습관 등에 대해 확인합니다.",xEn:"Identifies modifiable risk factors for pediatric UTI; substantial weight for prevention and management insights.",xKo:"소아 요로감염의 수정 가능한 위험 요인을 파악하는 데 도움이 됩니다. 예방 및 치료적 통찰을 위해 상당한 가중치를 부여합니다."},
          {id:"1-4-2-4",pts:7,en:"Item 13. Prior UTIs or Anomalies: Asks about recurrent infections, vesicoureteral reflux, or structural issues.",ko:"항목 13. 이전 요로감염 또는 구조적 이상: 반복적인 요로감염, 방광요관역류, 또는 구조적 이상 여부를 확인합니다.",xEn:"Guides imaging/threshold for admission; moderate-high weight for recurrence risk.",xKo:"영상 검사 필요성이나 입원 기준 판단에 도움을 줍니다. 재발 위험을 고려하여 중간-높은 수준의 가중치를 부여합니다."},
          {id:"1-4-2-5",pts:7,en:"Item 14. Fever Details: Documents pattern, peak temperature, chills, response to antipyretics, and night sweats.",ko:"항목 14. 발열 세부 사항: 발열 양상, 최고 체온, 오한, 해열제에 대한 반응, 야간 발한 여부를 확인합니다.",xEn:"Gauges systemic involvement in pyelonephritis; weighted for sepsis risk stratification.",xKo:"신우신염에서 전신 침범 여부를 평가하는 데 도움이 됩니다. 패혈증 위험 평가를 위해 가중치를 부여합니다."},
          {id:"1-4-2-6",pts:6,en:"Item 15. Differentiating Symptoms: Screens for vomiting, diarrhea, joint pains, or rash to exclude appendicitis, gastroenteritis, or other mimics.",ko:"항목 15. 감별 진단을 위한 증상 확인: 충수염, 위장염 또는 기타 유사 질환을 배제하기 위해 구토, 설사, 관절통, 발진 등의 증상을 확인합니다.",xEn:"Refines differential in febrile abdominal pain; lower weight as confirmatory rather than primary.",xKo:"발열과 복통이 있는 경우 감별 진단을 정교하게 하는 데 도움이 됩니다. 일차적이라기보다 확인적 역할이므로 낮은 가중치를 부여합니다."},
        ],
      },
    ],
  },
  { id:2, en:"Case 2: Toddler with vomiting and diarrhea — viral gastroenteritis with moderate dehydration", ko:"사례 2: 구토와 설사를 호소하는 유아 — 중등도 탈수를 동반한 바이러스성 위장관염",
    vignette:{rows:[
        { en:"Chief Complaint", ko:"주 호소", val_en:"Vomiting, watery diarrhea, and poor oral intake", val_ko:"구토, 수양성 설사, 경구 섭취 감소" },
        { en:"History of Presenting Illness", ko:"현병력", val_en:"3-year-old boy with 2 days of non-bloody, non-bilious vomiting (4 episodes) and watery diarrhea (6–7 stools/day). Low-grade fever to 38.2°C, generalized crampy abdominal pain, markedly reduced oral intake, no void in ~10 hours. No hematochezia, no bilious emesis, no recent travel. Several daycare contacts with similar illness.", val_ko:"3세 남아로 2일 전부터 비혈성, 비담즙성 구토(4회)와 수양성 설사(하루 6–7회) 발생. 38.2°C까지 미열, 전반적 경련성 복통, 경구 섭취 현저히 감소, 약 10시간 동안 배뇨 없음. 혈변 없음, 담즙성 구토 없음, 최근 여행력 없음. 어린이집에서 비슷한 증상 접촉자 여러 명 있음." },
        { en:"Past Medical History", ko:"과거 병력", val_en:"Unremarkable; term birth; normal development.", val_ko:"특이사항 없음; 만삭 출생; 발달 정상." },
        { en:"Medications", ko:"복용 약물", val_en:"None routinely; single dose acetaminophen last night.", val_ko:"정기 복용 약물 없음; 어젯밤 아세트아미노펜 1회 복용." },
        { en:"Allergies", ko:"알레르기", val_en:"No known drug allergies.", val_ko:"알려진 약물 알레르기 없음." },
        { en:"Family/Social History", ko:"사회력/가족력", val_en:"Lives with parents; attends daycare; no smokers at home.", val_ko:"부모와 함께 거주; 어린이집 등원 중; 집에서 흡연자 없음." },
        { en:"Immunizations", ko:"예방접종", val_en:"Up-to-date for age (including rotavirus series completed).", val_ko:"연령에 맞게 접종 완료(로타바이러스 백신 포함)." },
        { en:"Review of Systems", ko:"계통별 문진", val_en:"Positive: fever, vomiting, diarrhea, abdominal cramping, decreased urine output. Negative: severe localized pain, rash, cough, dysuria, blood in stool.", val_ko:"양성: 발열, 구토, 설사, 복부 경련, 소변량 감소. 음성: 심한 국소 복통, 발진, 기침, 배뇨통, 혈변." },
        { en:"Relevant Lab/Studies", ko:"관련 검사 결과", val_en:"CBC normal. BMP: Na 134 (low), CO₂ 16 (low), BUN 24 (high). VBG: pH 7.34, HCO₃⁻ 18 (low). Glucose 74. UA: SG 1.030, ketones 1+, nitrite/LE negative.", val_ko:"CBC 정상. BMP: Na 134 (낮음), CO₂ 16 (낮음), BUN 24 (높음). 정맥 혈가스: pH 7.34, HCO₃⁻ 18 (낮음). 혈당 74. 소변: 비중 1.030, 케톤 1+, 아질산염/LE 음성." }
      ],
      vitals:[
        { en:"Age", ko:"연령", val_en:"3 years", val_ko:"3세" },
        { en:"Temperature", ko:"체온", val_en:"38.1 °C (36.5–37.5 °C)", val_ko:"38.1°C (36.5–37.5°C)" },
        { en:"Heart Rate", ko:"심박수", val_en:"138 bpm (80–120 bpm) — tachycardic", val_ko:"138 bpm (80–120 bpm) — 빈맥" },
        { en:"Respiratory Rate", ko:"호흡수", val_en:"28 breaths/min (20–28 breaths/min)", val_ko:"28회/분 (20–28회/분)" },
        { en:"Blood Pressure", ko:"혈압", val_en:"92/58 mmHg (90–110/55–75 mmHg)", val_ko:"92/58 mmHg (90–110/55–75 mmHg)" },
        { en:"SpO₂", ko:"산소포화도", val_en:"98% on room air (≥95%)", val_ko:"98% 실내 공기 (≥95%)" },
        { en:"Weight", ko:"체중", val_en:"14.2 kg", val_ko:"14.2 kg" }
      ],
      exam:[
        { en:"General", ko:"전반", val_en:"Tired but alert; mildly ill-appearing; no respiratory distress", val_ko:"피곤해 보이나 의식 명료; 경미한 병색; 호흡곤란 없음" },
        { en:"HEENT", ko:"HEENT", val_en:"Dry mucous membranes, mild sunken eyes; no tonsillar exudates; TMs clear", val_ko:"점막 건조, 눈이 약간 들어감; 편도 삼출 없음; 고막 정상" },
        { en:"Cardiovascular", ko:"심혈관", val_en:"Tachycardic, regular rhythm, no murmur; capillary refill ~3 seconds", val_ko:"빈맥, 규칙적 리듬, 심잡음 없음; 모세혈관 재충만 약 3초" },
        { en:"Respiratory", ko:"호흡기", val_en:"Clear to auscultation; no wheeze/crackles; good air entry", val_ko:"청진 시 깨끗함; 천명/수포음 없음; 공기 유입 양호" },
        { en:"Abdomen", ko:"복부", val_en:"Soft, nondistended; mild diffuse tenderness; bowel sounds hyperactive", val_ko:"부드럽고 팽만 없음; 전반적 경미 압통; 장음 증가" },
        { en:"Skin", ko:"피부", val_en:"Warm; mild decreased turgor; no rash; no petechiae/purpura", val_ko:"따뜻함; 피부 긴장도 약간 감소; 발진 없음; 점상출혈/자반 없음" },
        { en:"Neuro", ko:"신경", val_en:"Interactive; normal tone; no focal deficit", val_ko:"상호작용 가능; 근긴장도 정상; 국소 신경학적 결손 없음" }
      ]},
    rubrics:[
      {
        id:"2-1",
        label_en:"Rubric 1",
        label_ko:"기준표 1",
        d1pts:50,d2pts:50,
        d1desc_en:"",
        d1desc_ko:"",
        d2desc_en:"",
        d2desc_ko:"",
        threshold_en:"",
        threshold_ko:"",
        rationale_en:"",
        rationale_ko:"",
        d1:[
          {
            id:"2-1-1-1",
            pts:5,
            en:"Item 1. Chief Complaint: Clearly elicits and articulates the primary presenting problem(s) in patient's/family's own words. — 5 points",
            ko:"항목 1. 주호소: 환자 또는 보호자의 표현을 그대로 반영하여 주요 호소 증상을 명확히 확인하고 정리합니다.",
            xEn:"Establishes encounter focus; foundational and routinely expected, modest weight.",
            xKo:"진료의 초점을 설정하는 단계로 모든 병력 청취의 기초가 됩니다. 일반적으로 항상 수행되는 기본 항목이므로 비교적 낮은 가중치를 부여합니다."
          },
          {
            id:"2-1-1-2",
            pts:12,
            en:"Item 2. History of Presenting Illness: Systematically explores onset, timing, duration, severity, progression, aggravating/alleviating factors, and associated symptoms using a structured approach (e.g., OPQRST). — 12 points",
            ko:"항목 2. 현병력: OPQRST와 같은 구조화된 접근을 사용하여 발병 시점, 발생 시기, 지속 기간, 중증도, 진행 양상, 악화/완화 요인, 동반 증상을 체계적으로 탐색합니다.",
            xEn:"Captures illness trajectory for urgency in pediatric EM; core to all differentials, highest general weight.",
            xKo:"질환의 경과를 파악하여 소아 응급 상황에서 긴급도를 판단하는 데 도움이 됩니다. 모든 감별 진단의 핵심이 되는 요소이므로 일반 항목 중 가장 높은 가중치를 부여합니다."
          },
          {
            id:"2-1-1-3",
            pts:7,
            en:"Item 3. Past Medical History: Inquires about chronic illnesses, prior hospitalizations, surgeries, birth/developmental history, and previous similar episodes. — 7 points",
            ko:"항목 3. 과거 병력: 만성 질환, 이전 입원 이력, 수술 이력, 출생력 및 발달력, 과거 유사 증상 발생 여부를 확인합니다.",
            xEn:"Identifies risks or patterns affecting management; moderate for baseline stratification.",
            xKo:"치료 계획에 영향을 줄 수 있는 위험 요인이나 질환 패턴을 파악하는 데 도움이 됩니다. 기본적인 위험도 평가를 위해 중간 수준의 가중치를 부여합니다."
          },
          {
            id:"2-1-1-4",
            pts:4,
            en:"Item 4. Medications: Documents current prescriptions, over-the-counter drugs, recent antibiotics, and adherence. — 4 points",
            ko:"항목 4. 약물 복용력: 현재 처방약, 일반의약품, 최근 항생제 사용, 약물 복용 순응도를 확인합니다.",
            xEn:"Guides therapy and avoids interactions; straightforward, low weight.",
            xKo:"치료 계획 수립에 도움이 되며 약물 상호작용을 예방합니다. 비교적 확인이 간단한 항목이므로 낮은 가중치를 부여합니다."
          },
          {
            id:"2-1-1-5",
            pts:4,
            en:"Item 5. Allergies: Asks about drug/food allergies, adverse reactions, and anaphylaxis history. — 4 points",
            ko:"항목 5. 알레르기 병력: 약물 및 음식 알레르기, 이상 반응, 아나필락시스 병력을 확인합니다.",
            xEn:"Ensures prescribing safety; low weight paired with medications.",
            xKo:"안전한 처방을 위해 필수적인 확인 항목입니다. 약물 복용력과 함께 환자 안전을 위한 선별 항목이므로 낮은 가중치를 부여합니다."
          },
          {
            id:"2-1-1-6",
            pts:4,
            en:"Item 6. Immunizations: Confirms status, recent vaccines, and gaps relevant to infectious risks. — 4 points",
            ko:"항목 6. 예방접종: 예방접종 상태, 최근 접종 여부, 감염 위험과 관련된 접종 공백 여부를 확인합니다.",
            xEn:"Critical in pediatrics for context; low as often documented.",
            xKo:"소아 진료에서 감염 위험을 평가하는 데 중요한 배경 정보를 제공합니다. 대부분 이미 기록되어 있는 경우가 많으므로 낮은 가중치를 부여합니다."
          },
          {
            id:"2-1-1-7",
            pts:5,
            en:"Item 7. Family History: Explores hereditary conditions and relevant familial illnesses. — 5 points",
            ko:"항목 7. 가족력: 유전 질환 및 관련 가족 질환 여부를 확인합니다.",
            xEn:"Uncovers genetic risks; pediatric-relevant, moderate weight.",
            xKo:"유전적 위험 요인을 파악하는 데 도움이 됩니다. 소아 환자에서의 중요성을 고려하여 중간 수준의 가중치를 부여합니다."
          },
          {
            id:"2-1-1-8",
            pts:4,
            en:"Item 8. Social History: Assesses home environment, caregivers, school/daycare exposure, and habits. — 4 points",
            ko:"항목 8. 사회력: 가정 환경, 보호자, 학교/어린이집 노출, 생활 습관을 평가합니다.",
            xEn:"Contextualizes adherence/exposures; supportive, low weight.",
            xKo:"치료 순응도와 환경적 노출을 이해하는 데 도움이 되는 맥락 정보를 제공합니다. 보조적인 역할이므로 낮은 가중치를 부여합니다."
          },
          {
            id:"2-1-1-9",
            pts:5,
            en:"Item 9. Review of Systems: Performs age-appropriate screening for unrelated symptoms. — 5 points",
            ko:"항목 9. 전신 증상 검토: 관련되지 않은 증상을 확인하기 위해 연령에 적절한 선별 문진을 시행합니다.",
            xEn:"Safety net for comorbidities; moderate for comprehensiveness.",
            xKo:"동반 질환을 놓치지 않도록 하는 안전망 역할을 합니다. 포괄적인 평가를 위해 중간 수준의 가중치를 부여합니다."
          },
        ],
        d2:[
          {
            id:"2-1-2-10",
            pts:12,
            en:"Item 10. Vomiting Characterization: Probes frequency, volume, content (bilious/bloody/projectile), timing, triggers, and relation to feeds/intake. — 12 points",
            ko:"항목 10. 구토 특성 평가: 구토의 빈도, 양, 내용물(담즙성/혈성/분출성 여부), 발생 시점, 유발 요인, 그리고 음식 섭취와의 관계를 확인합니다.",
            xEn:"Primary symptom defining GE; high weight to differentiate obstruction vs. infectious causes.",
            xKo:"위장관염을 특징짓는 주요 증상입니다. 장폐색과 같은 질환과 감염성 원인을 구별하는 데 중요하므로 높은 가중치를 부여합니다."
          },
          {
            id:"2-1-2-11",
            pts:10,
            en:"Item 11. Diarrhea Characterization: Details frequency, volume, consistency, blood/mucus, and fecal odor. — 10 points",
            ko:"항목 11. 설사 특성 평가: 설사의 빈도, 양, 대변의 성상, 혈액 또는 점액 여부, 대변 냄새 등을 확인합니다.",
            xEn:"Quantifies GE severity and rules out invasive pathogens; high but secondary to vomiting.",
            xKo:"위장관염의 중증도를 파악하고 침습성 병원체 가능성을 배제하는 데 도움이 됩니다. 중요하지만 구토 평가보다 이차적인 요소이므로 다소 낮은 가중치를 부여합니다."
          },
          {
            id:"2-1-2-12",
            pts:12,
            en:"Item 12. Dehydration History: Assesses oral intake (amount/type tolerated), urine output, tears, thirst, and activity changes. — 12 points",
            ko:"항목 12. 탈수 관련 병력: 경구 섭취량(섭취 가능한 양과 종류), 소변량, 눈물 유무, 갈증, 활동 수준 변화 등을 평가합니다.",
            xEn:"Pivotal for dehydration degree and disposition in peds EM; highest weight for rehydration decisions.",
            xKo:"소아 응급 상황에서 탈수 정도와 처치 방향을 결정하는 데 핵심적인 요소입니다. 수액 치료 및 재수화 방법을 결정하는 데 직접적인 영향을 미치므로 가장 높은 가중치를 부여합니다."
          },
          {
            id:"2-1-2-13",
            pts:8,
            en:"Item 13. Exposure History: Inquires about sick contacts, daycare outbreaks, travel, diet changes, and animal exposures. — 8 points",
            ko:"항목 13. 노출력: 아픈 접촉자, 어린이집 집단 발생, 여행력, 식이 변화, 동물 접촉 여부 등을 확인합니다.",
            xEn:"Confirms viral etiology and outbreak risk; substantial for targeted dx/public health.",
            xKo:"바이러스성 원인을 확인하고 집단 발생 가능성을 평가하는 데 도움이 됩니다. 표적 진단과 공중보건적 대응 측면에서 중요하므로 비교적 높은 가중치를 부여합니다."
          },
          {
            id:"2-1-2-14",
            pts:5,
            en:"Item 14. Fever Pattern: Documents onset, peaks, chills, and antipyretic response. — 5 points",
            ko:"항목 14. 발열 양상: 발열 시작 시점, 최고 체온, 오한 여부, 해열제에 대한 반응을 확인합니다.",
            xEn:"Gauges inflammatory burden; moderate as supportive of systemic GE.",
            xKo:"염증 반응의 정도를 파악하는 데 도움이 됩니다. 전신적 위장관염을 시사하는 보조적 정보이므로 중간 수준의 가중치를 부여합니다."
          },
          {
            id:"2-1-2-15",
            pts:3,
            en:"Item 15. Red Flag Screening: Explores bilious emesis, hematochezia, severe/localized pain, lethargy, or neurological changes. — 3 points",
            ko:"항목 15. 위험 신호 선별: 담즙성 구토, 혈변, 심한 또는 국소적인 통증, 무기력, 신경학적 변화 여부를 확인합니다.",
            xEn:"Excludes surgical emergencies (e.g., intussusception); lower confirmatory weight.",
            xKo:"장중첩증과 같은 외과적 응급 질환을 배제하기 위한 질문입니다. 주된 진단을 확인하기보다 배제를 위한 요소이므로 낮은 가중치를 부여합니다."
          },
        ]
      },
      {
        id:"2-2",
        label_en:"Rubric 2",
        label_ko:"기준표 2",
        d1pts:40,d2pts:60,
        d1desc_en:"This domain evaluates standard pediatric interviewing techniques, ensuring a comprehensive background is obtained to contextualize the acute illness.",
        d1desc_ko:"이 영역은 표준적인 소아 문진 기법을 평가하며, 급성 질환을 이해하기 위한 포괄적인 배경 정보를 수집하는지를 확인합니다.",
        d2desc_en:"This domain evaluates the candidate's clinical reasoning, specifically their ability to quantify dehydration, rule out surgical abdomen red flags, and determine if the child requires admission.",
        d2desc_ko:"이 영역은 응시자의 임상적 추론 능력을 평가하며, 특히 탈수 정도를 정량화하고, 외과적 복증의 위험 신호를 배제하며, 입원 필요 여부를 판단할 수 있는지를 평가합니다.",
        threshold_en:"Note to Evaluator: A score of zero on Item 2.1 (Hydration) or Item 2.2 (Bilious/Bloody screen) constitutes a \"Critical Fail,\" as these omissions endanger patient safety.",
        threshold_ko:"평가자 참고 사항: 항목 2.1(수분 상태 평가) 또는 항목 2.2(담즙성/혈성 구토 선별)에서 0점을 받을 경우 \"Critical Fail(중대한 실패)\"로 간주됩니다. 이러한 항목을 놓치는 것은 환자 안전에 위험을 초래할 수 있습니다.",
        rationale_en:"",
        rationale_ko:"",
        d1:[
          {
            id:"2-2-1-1",
            pts:5,
            en:"Item 1. Introduction and Dyadic Engagement: Introduces self to parents and the toddler. Attempts to engage the toddler (e.g., wave, smile, simple question) to assess baseline alertness while obtaining history from caregivers. — 5 points",
            ko:"항목 1. 소개 및 이중 상호작용: 보호자와 유아에게 자신을 소개하고, 유아와의 상호작용을 시도합니다(예: 손 흔들기, 미소, 간단한 질문). 동시에 보호자로부터 병력을 청취하면서 아이의 기본적인 각성 상태를 평가합니다.",
            xEn:"In a dehydrated child, the initial interaction is data. A child who engages back is less likely to be in shock. Establishing rapport with anxious parents is essential for obtaining an accurate history of intake.",
            xKo:"탈수된 소아에서 초기 상호작용 자체가 중요한 임상 정보가 됩니다. 아이가 상호작용에 반응한다면 쇼크 상태일 가능성은 낮습니다. 불안한 보호자와 신뢰 관계를 형성하는 것은 섭취량과 관련된 정확한 병력을 얻는 데 중요합니다."
          },
          {
            id:"2-2-1-2",
            pts:10,
            en:"Item 2. Chronology and Symptom Progression: Establishes the exact onset of vomiting vs. diarrhea. Determines the frequency of episodes over the last 24–48 hours and whether symptoms are improving or worsening. — 10 points",
            ko:"항목 2. 시간 경과 및 증상 진행 양상: 구토와 설사의 정확한 발생 시점을 구분하여 확인합니다. 지난 24–48시간 동안의 증상 발생 빈도와 증상이 호전되는지 또는 악화되는지를 파악합니다.",
            xEn:"Differentiating viral gastroenteritis (often vomiting first, then diarrhea) from other pathologies requires a clear timeline. It also establishes the \"pace\" of fluid loss.",
            xKo:"바이러스성 위장관염(대개 구토가 먼저 나타난 후 설사가 발생)과 다른 질환을 감별하기 위해서는 명확한 시간 경과가 필요합니다. 또한 체액 손실이 얼마나 빠르게 진행되고 있는지를 판단하는 데에도 중요합니다."
          },
          {
            id:"2-2-1-3",
            pts:10,
            en:"Item 3. Past Medical History and Immunization Status: Asks about birth history, underlying chronic conditions, and specifically confirms Rotavirus vaccination status. — 10 points",
            ko:"항목 3. 과거 병력 및 예방접종 상태: 출생력, 기저 만성 질환 여부를 확인하고, 특히 로타바이러스 예방접종 여부를 확인합니다.",
            xEn:"A history of prematurity or prior surgeries could raise the risk for adhesions/obstruction. Knowing the Rotavirus status helps risk-stratify the likelihood of severe viral illness versus other causes.",
            xKo:"미숙아 출생력이나 이전 수술 병력이 있는 경우 유착이나 장폐색 위험이 증가할 수 있습니다. 또한 로타바이러스 예방접종 여부를 확인하면 중증 바이러스성 질환의 가능성과 다른 원인의 가능성을 구분하는 데 도움이 됩니다."
          },
          {
            id:"2-2-1-4",
            pts:10,
            en:"Item 4. Epidemiology and Sick Contacts: Inquires about daycare attendance, recent travel, and similar symptoms in family members or close contacts. — 10 points",
            ko:"항목 4. 역학적 요인 및 접촉력: 어린이집 등원 여부, 최근 여행력, 가족이나 가까운 접촉자 중 유사한 증상이 있는지 확인합니다.",
            xEn:"The presence of \"cluster cases\" (like the daycare contacts in this vignette) strongly supports a viral diagnosis and lowers the probability of surgical pathology, though it does not eliminate it.",
            xKo:"집단 발생 사례(이사례에서처럼 어린이집 접촉자)가 있는 경우 바이러스성 원인을 강하게 시사하며, 외과적 질환 가능성은 낮아집니다. 다만 이러한 가능성을 완전히 배제할 수는 없습니다."
          },
          {
            id:"2-2-1-5",
            pts:5,
            en:"Item 5. Medication and Allergy Review: Confirms current medications (including recent antipyretics or anti-emetics given at home) and allergies. — 5 points",
            ko:"항목 5. 약물 및 알레르기 확인: 현재 복용 중인 약물(집에서 투여한 해열제나 항구토제 포함)과 알레르기 여부를 확인합니다.",
            xEn:"Essential to ensure no toxic ingestions mimic gastroenteritis and to determine if the child has already failed home management (e.g., vomited after Tylenol).",
            xKo:"독성 물질 섭취가 위장관염처럼 보이는 증상을 유발했을 가능성을 배제하고, 아이가 이미 가정에서의 처치에 실패했는지 판단하는 데 중요합니다."
          },
        ],
        d2:[
          {
            id:"2-2-2-6",
            pts:20,
            en:"Item 6. Quantification of Hydration Status (The \"In and Out\" Assessment): Intake - Specifics on fluid type (water vs. juice vs. rehydration solution) and volume attempted; Output - Specific inquiry regarding the time of last wet diaper/void and the quantity of urine relative to baseline. — 20 points",
            ko:"항목 6. 수분 상태 정량화(\"섭취/배출\" 평가): 섭취 — 시도한 수분의 종류(물, 주스, 경구 수분 보충 용액 등)와 섭취량을 구체적으로 확인합니다. 배설 — 마지막 기저귀가 젖은 시간/마지막 배뇨 시점과 평소와 비교한 소변량을 구체적으로 확인합니다.",
            xEn:"This is the most heavily weighted item. The vignette indicates no void for 10 hours and tachycardia, signaling moderate dehydration. The history of urine output is the most reliable historical proxy for end-organ perfusion. Failure to ask this misses the severity of the case.",
            xKo:"이 항목은 가장 높은 가중치를 가집니다. 사례에서는 10시간 동안 배뇨가 없고 빈맥이 나타나 중등도 탈수를 시사합니다. 소변량 병력은 말초 장기 관류 상태를 평가하는 가장 신뢰할 수 있는 병력 기반 지표입니다. 이를 질문하지 않으면 환자의 중증도를 놓치게 됩니다."
          },
          {
            id:"2-2-2-7",
            pts:15,
            en:"Item 7. Characterization of Emesis and Stool (Red Flag Screen): Explicitly asks if vomit is bilious (green) or bloody, and if stool contains blood (hematochezia) or mucus (dysentery). — 15 points",
            ko:"항목 7. 구토 및 대변 특성 평가(위험 신호 선별): 구토물이 담즙성(녹색)인지 또는 혈성인지, 대변에 혈액(혈변)이나 점액(이질성 설사)이 있는지 명확히 질문합니다.",
            xEn:"Bilious vomiting in a toddler is a surgical emergency (volvulus/malrotation) until proven otherwise. Bloody stool changes the differential to bacterial enteritis or intussusception. These questions must be asked to safely diagnose \"simple\" gastroenteritis.",
            xKo:"유아에서 담즙성 구토는 장염전/장회전 이상과 같은 외과적 응급 상황을 시사할 수 있으므로, 반증될 때까지 응급으로 간주해야 합니다. 또한 혈변이 있는 경우 세균성 장염이나 장중첩증 가능성을 고려해야 합니다."
          },
          {
            id:"2-2-2-8",
            pts:10,
            en:"Item 8. Pain Characterization (Intussusception/Appendicitis Screen): Distinguishes between generalized cramping (typical of gastroenteritis) vs. focal pain (RLQ) or severe, intermittent, colicky pain (intussusception). — 10 points",
            ko:"항목 8. 통증 특성 평가(장중첩증/충수염 선별): 전반적인 경련성 통증(위장관염에서 흔함)인지, 국소적인 통증(우하복부)인지, 또는 심하고 간헐적인 산통성 통증(장중첩증)을 구분하여 확인합니다.",
            xEn:"While the child has diarrhea, the clinician must ensure this isn't a surgical abdomen presenting atypically. Intussusception often presents with lethargy and vomiting; failing to characterize the pain pattern can lead to a missed diagnosis.",
            xKo:"이 아이에게 설사가 있지만, 임상의는 이것이 비전형적으로 나타난 외과적 복증이 아닌지 반드시 확인해야 합니다. 장중첩증은 무기력과 구토로 나타나는 경우가 많으며, 통증의 양상을 제대로 평가하지 않으면 진단을 놓칠 수 있습니다."
          },
          {
            id:"2-2-2-9",
            pts:10,
            en:"Item 9. Activity Level and Mental Status (Perfusion Assessment): Asks about the child’s behavior at home. Are they playing? Are they lethargic/floppy? Are they producing tears when crying? — 10 points",
            ko:"항목 9. 활동 수준 및 정신 상태 평가(관류 상태 평가): 집에서 아이의 행동 상태에 대해 질문합니다. 아이가 평소처럼 놀고 있는지, 무기력하거나 축 늘어져 있는지, 울 때 눈물이 나는지 등을 확인합니다.",
            xEn:"Parental report of activity is a sensitive indicator of systemic illness. A child who is \"not acting himself\" or is difficult to arouse suggests severe dehydration or sepsis/metabolic derangement (e.g., hypoglycemia or electrolyte imbalance).",
            xKo:"부모가 보고하는 아이의 활동 수준은 전신 질환을 평가하는 데 민감한 지표입니다. 아이가 \"평소와 다르게 행동한다\"거나 깨우기 어려운 상태라면 중증 탈수나 패혈증, 또는 대사 이상(예: 저혈당이나 전해질 불균형)을 시사할 수 있습니다."
          },
          {
            id:"2-2-2-10",
            pts:5,
            en:"Item 10. Systemic Review for Extraintestinal Causes: Screens for non- GI causes of vomiting, specifically asking about cough/tachypnea (pneumonia), dysuria (UTI), or headache/stiff neck (meningitis). — 5 points",
            ko:"항목 10. 장관 외 원인에 대한 전신 문진: 구토의 비위장관 원인을 선별하기 위해 기침/빈호흡(폐렴), 배뇨통(요로감염), 두통/경부 강직(수막염) 여부를 질문합니다.",
            xEn:"In pediatrics, vomiting is a nonspecific sign of infection. A thorough clinician considers sources outside the abdomen, such as a lower lobe pneumonia or UTI, which are ruled out in the vignette but must be asked about.",
            xKo:"소아에서 구토는 비특이적인 감염 증상일 수 있습니다. 숙련된 임상의는 복부 외의 원인도 고려해야 하며, 예를 들어 하엽 폐렴이나 요로감염 등이 해당됩니다. 이러한 원인들은 이사례에서는 배제되지만, 반드시 문진을 통해 확인해야 합니다."
          },
        ]
      },
      {
        id:"2-3",
        label_en:"Rubric 3",
        label_ko:"기준표 3",
        d1pts:38,d2pts:62,
        d1desc_en:"",
        d1desc_ko:"",
        d2desc_en:"",
        d2desc_ko:"",
        threshold_en:"",
        threshold_ko:"",
        rationale_en:"Design Rationale for Domain Weighting: Domain 2 receives a heavier weighting (62/38) because in pediatric gastroenteritis, the quality of the clinical encounter depends overwhelmingly on the accuracy of dehydration assessment and the ability to exclude surgical mimics — both of which are history-driven skills. The general history elements in Domain 1 provide essential context and safety checks but are less discriminating of clinical competence for this specific presentation. The rubric intentionally emphasizes that the most impactful questions in this case are quantitative (how much in, how much out, how long since last void) rather than purely qualitative, reﬂecting the ﬂuid-balance–centered reasoning that defines excellent management of this common pediatric emergency. 영역 가중치 설계 근거: 소아 위장관염에서는 탈수 평가의 정확성과 외과적 질환 가능성을 배제하는 능력이 임상 평가의 핵심이므로 영역 2에 더 높은 가중치(62/38)를 부여하였다. 이 두 가지는 모두 병력 청취에 크게 의존하는 기술이다. 영역 1의 일반 병 력 요소들은 중요한 배경 정보와 안전 확인 역할을 하지만, 이 증례에서 임상 역량을 구별하는 요소로서는 상대적으로 영향이 적 다. 따라서 이 기준표는 이 사례에서 가장 중요한 질문이 질적 질문이 아니라 정량적 질문(얼마나 섭취했는지, 얼마나 배출했는 지, 마지막 배뇨가 언제였는지 등)이라는 점을 강조하도록 설계되었다. 이는 소아에서 흔한 응급 상황인 위장관염 관리에서 핵심 이 되는 체액 균형 중심의 임상 추론을 반영한다.",
        rationale_ko:"영역 가중치 설계 근거: 소아 위장관염에서는 탈수 평가의 정확성과 외과적 질환 가능성을 배제하는 능력이 임상 평가의 핵심이므로 영역 2에 더 높은 가중치(62/38)를 부여하였다. 이 두 가지는 모두 병력 청취에 크게 의존하는 기술이다. 영역 1의 일반 병 력 요소들은 중요한 배경 정보와 안전 확인 역할을 하지만, 이 증례에서 임상 역량을 구별하는 요소로서는 상대적으로 영향이 적 다. 따라서 이 기준표는 이 사례에서 가장 중요한 질문이 질적 질문이 아니라 정량적 질문(얼마나 섭취했는지, 얼마나 배출했는 지, 마지막 배뇨가 언제였는지 등)이라는 점을 강조하도록 설계되었다. 이는 소아에서 흔한 응급 상황인 위장관염 관리에서 핵심 이 되는 체액 균형 중심의 임상 추론을 반영한다.",
        d1:[
          {
            id:"2-3-1-1",
            pts:8,
            en:"Item 1. Presenting Complaint Characterization: Systematic exploration of each presenting symptom (vomiting, diarrhea, poor intake) including onset, duration, frequency, volume, progression, and character. — 8 points",
            ko:"항목 1. 주증상 특성 파악: 구토, 설사, 경구 섭취 감소 등 각 주증상에 대해 발생 시점, 지속 기간, 빈도, 양, 진행 양상, 특성을 체계적으로 탐색합니다.",
            xEn:"Precise quantification of vomiting episodes and stool output is foundational to this case. Unlike many presentations where symptom characterization is primarily diagnostic, here it directly determines the degree of dehydration and guides fluid resuscitation calculations. The high weighting reflects the dual diagnostic and management value.",
            xKo:"구토 횟수와 대변 배출량을 정확히 정량화하는 것은 이사례에서 매우 중요합니다. 증상 특성 파악이 탈수 정도를 판단하고 수액 보충량을 계산하는 데 직접적으로 사용되므로, 진단과 치료 결정 모두에 영향을 미친다는 점에서 높은 가중치를 부여합니다."
          },
          {
            id:"2-3-1-2",
            pts:5,
            en:"Item 2. Past Medical History: Inquiry into prior illnesses, hospitalizations, chronic conditions, prior episodes of dehydration, and neonatal/birth history. — 5 points",
            ko:"항목 2. 과거 병력: 이전 질환, 입원 이력, 만성 질환, 과거 탈수 에피소드, 신생아/출생력에 대해 확인합니다.",
            xEn:"A history of prematurity, metabolic disorders, congenital heart disease, or immunodeficiency would significantly alter the risk profile for a child with gastroenteritis. Prior episodes of dehydration requiring IV fluids inform the threshold for intervention. Standard but consistently important.",
            xKo:"미숙아 출생력, 대사 질환, 선천성 심장 질환, 면역결핍 등의 병력이 있는 경우 위장관염을 앓는 소아의 위험도는 크게 달라질 수 있습니다. 과거 정맥 수액 치료가 필요했던 탈수 병력은 치료 개입의 기준을 판단하는 데 도움이 됩니다."
          },
          {
            id:"2-3-1-3",
            pts:4,
            en:"Item 3. Medication and Allergy History: Current medications, recent antibiotic use, recently administered anti-emetics or anti-diarrheals, and drug allergies with reaction type. — 4 points",
            ko:"항목 3. 약물 및 알레르기 병력: 현재 복용 중인 약물, 최근 항생제 사용 여부, 최근 투여된 항구토제 또는 지사제, 그리고 반응 유형을 포함한 약물 알레르기를 확인합니다.",
            xEn:"Recent antibiotic use raises the possibility of Clostridioides difficile or antibiotic-associated diarrhea. Knowledge of what the family has already administered (e.g., acetaminophen, ondansetron) prevents therapeutic duplication and informs what has already been tried. Allergy documentation is a safety essential before prescribing ondansetron or IV fluids.",
            xKo:"최근 항생제 사용은 클로스트리디오이데스 디피실리 감염이나 항생제 관련 설사 가능성을 높일 수 있습니다. 보호자가 이미 투여한 약물을 확인하면 치료 중복을 방지하고 어떤 처치가 이미 시도되었는지 파악할 수 있습니다."
          },
          {
            id:"2-3-1-4",
            pts:3,
            en:"Item 4. Immunization History: Confirmation of vaccination status with particular attention to rotavirus series completion. — 3 points",
            ko:"항목 4. 예방접종 병력: 예방접종 상태를 확인하고 특히 로타바이러스 백신 접종 완료 여부를 확인합니다.",
            xEn:"Rotavirus vaccination status is directly relevant to the differential in a toddler with gastroenteritis. Incomplete vaccination shifts the pre-test probability toward rotavirus as an etiology and may influence decisions about stool testing. This item bridges general and case-specific relevance.",
            xKo:"위장관염이 있는 유아에서 로타바이러스 예방접종 여부는 감별 진단에 직접적으로 관련됩니다. 예방접종이 완료되지 않은 경우 로타바이러스 감염 가능성이 높아지며, 이는 대변 검사 여부 결정에도 영향을 줄 수 있습니다."
          },
          {
            id:"2-3-1-5",
            pts:3,
            en:"Item 5. Birth, Growth, and Developmental History: Perinatal history, growth trajectory, baseline weight if available, and developmental milestones. — 3 points",
            ko:"항목 5. 출생력, 성장 및 발달력: 주산기 병력, 성장 경과, 가능하다면 최근 기준 체중, 발달 이정표를 확인합니다.",
            xEn:"A recent baseline weight is invaluable for calculating percentage weight loss and quantifying dehydration. Growth faltering may suggest an underlying condition. Developmental status affects communication and behavioral assessment of illness severity. Moderate weight reflects supporting rather than primary diagnostic value.",
            xKo:"최근 기준 체중은 체중 감소 비율을 계산하여 탈수 정도를 정량화하는 데 매우 유용합니다. 성장 지연은 기저 질환을 시사할 수 있으며, 발달 상태는 질병 중증도를 평가할 때 의사소통과 행동 관찰에 영향을 줍니다."
          },
          {
            id:"2-3-1-6",
            pts:4,
            en:"Item 6. Social and Family History: Household composition, daycare attendance, caregivers' ability to manage oral rehydration at home, access to follow-up care, and any safeguarding considerations. — 4 points",
            ko:"항목 6. 사회력 및 가족력: 가족 구성, 어린이집 등원 여부, 보호자가 가정에서 경구 수분 보충을 관리할 수 있는지, 추적 진료에 접근 가능한지, 아동 보호와 관련된 고려 사항을 확인합니다.",
            xEn:"Social context is a critical determinant of disposition in gastroenteritis. A family's ability to administer oral rehydration, recognize worsening, and return if needed directly affects the safety of discharge. Daycare attendance is epidemiologically relevant. Safeguarding screening is mandatory in all pediatric emergency encounters.",
            xKo:"위장관염에서 사회적 환경은 처치 결정에 중요한 영향을 미칩니다. 보호자가 경구 수분 보충을 시행하고 상태 악화를 인지하여 필요 시 다시 내원할 수 있는지 여부는 안전한 퇴원 결정에 직접적으로 관련됩니다."
          },
          {
            id:"2-3-1-7",
            pts:4,
            en:"Item 7. Review of Systems: Structured screening of non-GI systems to identify alternative diagnoses or complications. — 4 points",
            ko:"항목 7. 전신 증상 검토: 다른 진단이나 합병증을 확인하기 위해 비위장관 계통에 대한 구조화된 선별 문진을 시행합니다.",
            xEn:"Targeted screening for respiratory symptoms (otitis media can cause vomiting in toddlers), urinary symptoms (UTI mimic), rash (viral exanthem, Henoch-Schönlein purpura), neurological symptoms (raised intracranial pressure), and joint complaints ensures the clinician has not anchored prematurely on gastroenteritis.",
            xKo:"호흡기 증상(예: 중이염은 유아에서 구토를 유발할 수 있음), 배뇨 증상(요로감염과의 감별), 발진, 신경학적 증상(두개내압 상승), 관절 증상 등을 확인하는 것은 임상의가 위장관염에만 성급히 집중하는 것을 방지합니다."
          },
          {
            id:"2-3-1-8",
            pts:3,
            en:"Item 8. Structured and Organized Approach: History obtained in logical sequence, demonstrates clinical reasoning, avoids redundancy, and integrates information across domains. — 3 points",
            ko:"항목 8. 체계적이고 조직적인 접근: 병력 청취가 논리적인 순서로 이루어지고, 임상적 추론을 보여주며, 불필요한 반복을 피하고 여러 영역의 정보를 통합합니다.",
            xEn:"Process quality matters — a disorganized history risks missing critical dehydration cues or red flags. This is an overall competency marker reflecting the trainee's ability to conduct an efficient, focused emergency history.",
            xKo:"과정의 질 또한 중요합니다. 병력 청취가 체계적이지 않으면 탈수의 중요한 단서나 위험 신호를 놓칠 수 있습니다. 이 항목은 수련의가 응급 상황에서 효율적이고 집중된 병력 청취를 수행할 수 있는지를 평가하는 전반적인 역량 지표입니다."
          },
          {
            id:"2-3-1-9",
            pts:4,
            en:"Item 9. Parental Concerns and Health Literacy Assessment: Exploration of the family's specific worries, their understanding of the illness, and what prompted the emergency visit. — 4 points",
            ko:"항목 9. 보호자의 우려 및 건강 이해도 평가: 가족이 특별히 걱정하는 점, 질환에 대한 이해 정도, 그리고 응급실 방문을 결정하게 된 이유를 탐색합니다.",
            xEn:"Understanding why the family presented now (e.g., decreased urine output, inability to keep fluids down, concern about lethargy) provides indirect evidence of illness severity and trajectory. It also establishes rapport and informs the approach to discharge education. In a toddler, the caregiver's observations are the primary data source, and respecting their assessment improves history quality.",
            xKo:"보호자가 지금 내원하게 된 이유(예: 소변량 감소, 수분을 유지하지 못함, 무기력에 대한 우려 등)를 이해하는 것은 질병의 중증도와 진행 경과에 대한 간접적인 정보를 제공합니다. 보호자의 관찰이 가장 중요한 정보원이므로, 보호자의 판단을 존중하는 것은 병력의 질을 높이는 데 기여합니다."
          },
        ],
        d2:[
          {
            id:"2-3-2-10",
            pts:14,
            en:"Item 10. Dehydration Assessment Through History: Systematic inquiry into urine output (last wet nappy/void, frequency, color), tears when crying, oral intake volume over past 24 hours, activity/energy level, and parental perception of clinical change. — 14 points",
            ko:"항목 10. 병력 기반 탈수 평가: 소변량(마지막 젖은 기저귀/배뇨 시점, 배뇨 빈도, 소변 색), 울 때 눈물 여부, 지난 24시간 동안의 경구 섭취량, 활동/에너지 수준, 그리고 아이의 상태 변화에 대한 보호자의 인식을 체계적으로 확인합니다.",
            xEn:"This is the single most important line of questioning for this case. The clinical decision — oral rehydration versus IV fluids, observation versus admission — hinges almost entirely on the assessed degree of dehydration. Urine output (no void in ~10 hours in this case) is the most reliable caregiver-reported proxy for hydration status. This receives the highest individual weighting because it directly and immediately determines management.",
            xKo:"이사례에서 가장 중요한 질문 영역입니다. 경구 수분 보충인지 정맥 수액 치료인지, 관찰 후 귀가인지 입원이 필요한지에 대한 임상 결정은 거의 전적으로 탈수 정도 평가에 달려 있습니다. 특히 소변량(이사례에서는 약 10시간 동안 배뇨 없음)은 보호자가 보고할 수 있는 수분 상태의 가장 신뢰할 수 있는 지표로, 치료 결정에 직접적이고 즉각적인 영향을 미칩니다."
          },
          {
            id:"2-3-2-11",
            pts:10,
            en:"Item 11. Vomiting Characterization: Frequency, volume, timing relative to oral intake, character (non-bilious vs. bilious, bloody vs. non-bloody), relationship to feeding, projectile nature, and whether the child can tolerate any sips between episodes. — 10 points",
            ko:"항목 11. 구토 특성 평가: 구토의 빈도, 양, 경구 섭취와의 시간적 관계, 성상(비담즙성 vs. 담즙성, 비혈성 vs. 혈성), 수유와의 관계, 분출성 여부, 그리고 구토 사이에 소량의 수분이라도 섭취하고 유지할 수 있는지 여부를 확인합니다.",
            xEn:"The character of vomiting is both diagnostically and prognostically critical. Bilious emesis mandates exclusion of surgical pathology (malrotation/volvulus). The ability or inability to retain any oral fluids is the key determinant of whether oral rehydration is feasible. Frequency and trajectory (improving vs. worsening) inform disposition. High weighting reflects dual diagnostic and management implications.",
            xKo:"구토의 성상은 진단과 예후 평가 모두에서 매우 중요합니다. 담즙성 구토는 외과적 병변(장회전 이상/장염전)을 반드시 배제해야 하는 신호입니다. 어떤 형태로든 경구 수분을 유지할 수 있는지 여부는 경구 수분 보충 치료 가능성을 판단하는 핵심 요소입니다."
          },
          {
            id:"2-3-2-12",
            pts:8,
            en:"Item 12. Diarrhea Characterization: Frequency, volume, consistency, presence of blood or mucus, color, and trajectory over the illness course. — 8 points",
            ko:"항목 12. 설사 특성 평가: 설사의 빈도, 양, 성상, 혈액 또는 점액 존재 여부, 색깔, 그리고 질병 경과 동안의 변화 양상을 확인합니다.",
            xEn:"Bloody or mucosanguineous diarrhea shifts the differential toward bacterial enteritis (Salmonella, Shigella, Campylobacter, EHEC) or intussusception and may trigger stool studies or imaging. High-volume watery diarrhea informs ongoing loss calculations for fluid management. The distinction between improving and escalating stool output affects disposition planning.",
            xKo:"혈성 또는 점액성 설사는 세균성 장염(살모넬라, 시겔라, 캄필로박터, 장출혈성 대장균)이나 장중첩증 가능성을 시사하며, 대변 검사나 영상 검사를 고려하게 만듭니다. 또한 다량의 수양성 설사는 체액 손실을 계산하여 수액 치료 계획을 세우는 데 중요합니다."
          },
          {
            id:"2-3-2-13",
            pts:8,
            en:"Item 13. Oral Intake and Rehydration Attempts: What fluids have been offered (type, volume), how much is being retained, timing and frequency of intake attempts, and whether oral rehydration solution has been tried. — 8 points",
            ko:"항목 13. 경구 섭취 및 재수화 시도: 어떤 종류의 수분이 제공되었는지(종류, 양), 실제로 유지된 양, 섭취 시도의 시간과 빈도, 경구 수분 보충 용액(ORS)을 사용해 보았는지 여부를 확인합니다.",
            xEn:"This is a direct assessment of whether outpatient oral rehydration has been adequately attempted and failed — a key threshold for escalation to IV rehydration. Knowing the type of fluid (juice, water, ORS) also matters, as inappropriate fluids can worsen osmotic diarrhea. High weighting reflects direct management impact.",
            xKo:"이는 외래에서의 경구 재수화 치료가 충분히 시도되었고 실패했는지를 직접적으로 평가하는 항목으로, 정맥 수액 치료로 전환할지 결정하는 중요한 기준이 됩니다. 제공된 수분의 종류(주스, 물, ORS 등)도 중요한데, 부적절한 음료는 삼투성 설사를 악화시킬 수 있기 때문입니다."
          },
          {
            id:"2-3-2-14",
            pts:8,
            en:"Item 14. Red Flags for Surgical and Serious Pathology: Targeted questioning to exclude bilious vomiting, severe or localized abdominal pain, abdominal distension, \"currant jelly\" stools, episodic inconsolable crying (intussusception), recent abdominal trauma, and testicular symptoms. — 8 points",
            ko:"항목 14. 외과적 및 중증 질환의 위험 신호 확인: 담즙성 구토, 심하거나 국소적인 복통, 복부 팽만, \"커런트 젤리\" 양상의 대변, 간헐적으로 달래기 어려운 울음(장중첩증), 최근 복부 외상, 고환 관련 증상 등을 배제하기 위한 표적 질문을 합니다.",
            xEn:"The most dangerous error in a child presenting with vomiting is missing a surgical abdomen. Malrotation with volvulus, intussusception, and appendicitis can all present with vomiting and abdominal pain in a toddler. Actively excluding these through targeted history questions is a patient safety imperative and a hallmark of competent emergency assessment.",
            xKo:"구토를 보이는 소아에서 가장 위험한 오류는 외과적 복증을 놓치는 것입니다. 장회전 이상에 의한 장염전, 장중첩증, 충수염은 모두 유아에서 구토와 복통으로 나타날 수 있습니다. 이러한 질환을 표적 병력 질문을 통해 적극적으로 배제하는 것은 환자 안전을 위해 필수적입니다."
          },
          {
            id:"2-3-2-15",
            pts:5,
            en:"Item 15. Epidemiological Context and Infectious Exposure: Sick contacts at daycare or home, recent travel, food exposures (undercooked meat, unpasteurized products), water source, and animal contact. — 5 points",
            ko:"항목 15. 역학적 배경 및 감염 노출력: 어린이집이나 가정 내 아픈 접촉자, 최근 여행력, 음식 노출(덜 익힌 고기, 비살균 제품), 물의 출처, 동물 접촉 여부를 확인합니다.",
            xEn:"Epidemiological history helps differentiate viral from bacterial gastroenteritis and identifies exposures requiring specific investigation (e.g., travel-associated diarrhea, food-borne outbreaks). Daycare outbreaks strongly support a viral etiology and reduce the need for stool cultures. Moderate weighting reflects supporting diagnostic value.",
            xKo:"역학적 맥락은 바이러스성 원인을 확인하고 세균성 또는 기생충성 원인을 시사하는 단서를 제공합니다. 집단 발생 사례와의 연결은 감염 원인을 좁히는 데 도움이 됩니다."
          },
          {
            id:"2-3-2-16",
            pts:5,
            en:"Item 16. Fever Pattern and Systemic Toxicity Assessment: Duration and height of fever, response to antipyretics, associated rigors, irritability versus consolability, lethargy, and parental assessment of how the child \"looks\" compared to previous illnesses. — 5 points",
            ko:"항목 16. 발열 양상 및 전신 중독 증상 평가: 발열의 지속 기간과 최고 체온, 해열제에 대한 반응, 동반된 오한, 보챔 여부와 달래짐 가능성, 무기력, 그리고 이전 질병과 비교 했을 때 아이의 상태가 어떤지에 대한 보호자의 평가를 확인한다.",
            xEn:"While low-grade fever is expected in viral gastroenteritis, high or persistent fever raises concern for bacterial enteritis, bacteremia, or a concurrent infection (UTI, meningitis). The child's consolability and interaction level are among the most reliable indicators of serious illness in toddlers. Parental comparison to prior illnesses is a valuable gestalt measure.",
            xKo:"바이러스성 위장관염에서는 저등도 발열이 흔하지만, 고열이거나 지속되는 발열 은 세균성 장염, 균혈증, 또는 동반 감염(요로감염, 수막염 등)을 의심하게 한다. 또한 아 이가 달래지는지 여부와 상호작용 수준은 유아에서 중증 질환을 평가하는 가장 신뢰할 수 있는 지표 중 하나이다. 보호자가 이전 질병과 비교하여 설명하는 전반적 인상 역시 중요한 임상적 판단 자료가 된다."
          },
          {
            id:"2-3-2-17",
            pts:4,
            en:"Item 17. Baseline Weight and Weight Change: Inquiry into the most recent known weight (e.g., well-child visit, home scale) and comparison with current measured weight. — 4 points",
            ko:"항목 17. 기준 체중 및 체중 변화 확인: 최근에 알려진 체중(예: 영유아 건강검진, 가정 용 체중계)과 현재 측정된 체중을 비교하여 확인한다.",
            xEn:"Percentage acute weight loss is the gold standard for quantifying dehydration. If a recent baseline weight is available, this single data point can convert a subjective dehydration assessment into an objective one (e.g., 5% loss = moderate dehydration). Clinicians who actively seek this information demonstrate strong clinical reasoning. Moderate weighting because a reliable baseline is often unavailable but should always be sought.",
            xKo:"급성 체중 감소 비율은 탈수 정도를 정량화하는 가장 정확한 기준이다. 최근 기준 체중을 알 수 있다면 이 한 가지 정보만으로도 주관적인 탈수 평가를 객관적인 평가로 전환할 수 있다(예: 5% 체중 감소 = 중등도 탈수). 이러한 정보를 적극적으로 확인하는 임상의는 높은 수준의 임상적 추론 능력을 보여준다. 다만 신뢰할 수 있는 기준 체중이 없는 경우도 많기 때문에 중간 수준의 가중치를 부여하였다."
          },
        ]
      },
      {
        id:"2-4",
        label_en:"Rubric 4",
        label_ko:"기준표 4",
        d1pts:40,d2pts:60,
        d1desc_en:"",
        d1desc_ko:"",
        d2desc_en:"",
        d2desc_ko:"",
        threshold_en:"",
        threshold_ko:"",
        rationale_en:"",
        rationale_ko:"",
        d1:[
          {
            id:"2-4-1-1",
            pts:8,
            en:"Item 1. Establishes Chief Concern and Symptom Timeline: Clearly identifies vomiting, diarrhea, and poor intake as primary concerns; defines onset, duration (2 days), sequence of symptoms, and progression. — 8 points",
            ko:"항목 1. 주호소 및 증상 시간 경과 파악: 구토, 설사, 경구 섭취 감소를 주요 문제로 명확히 확인하고, 발생 시점, 지속 기간(2일), 증상의 순서와 진행 양상을 규명합니다.",
            xEn:"A precise timeline distinguishes acute self-limited illness from evolving surgical or systemic pathology and guides urgency of management.",
            xKo:"명확한 시간 경과는 위장관염의 중증도를 판단하는 기초가 됩니다. 2일이라는 정확한 기간과 증상 순서는 치료 긴급도와 탈수 상태를 추정하는 데 도움이 됩니다."
          },
          {
            id:"2-4-1-2",
            pts:8,
            en:"Item 2. Characterizes Vomiting and Diarrhea in Detail: Elicits frequency, volume, color (bilious/non-bilious), presence of blood or mucus, projectile nature, relation to feeds, nocturnal symptoms, stool consistency and volume. — 8 points",
            ko:"항목 2. 위장관 증상 특성화: 구토(담즙성/혈성 여부, 분출성, 빈도)와 설사(혈액/점액 여부, 빈도, 성상)를 상세히 특성화하고, 담즙성 구토나 혈변과 같은 적신호를 배제합니다.",
            xEn:"Detailed characterization differentiates viral gastroenteritis from obstruction, bacterial colitis, intracranial causes, or metabolic disease.",
            xKo:"담즙성 구토와 혈변은 외과적 응급 상황을 시사하며 단순 위장관염과 구별해야 합니다. 가장 높은 가중치는 이러한 적신호를 배제하는 것이 환자 안전에 직결되기 때문입니다."
          },
          {
            id:"2-4-1-3",
            pts:6,
            en:"Item 3. Assesses Associated and Red-Flag Symptoms: Screens for severe localized abdominal pain, bilious emesis, hematochezia, persistent high fever, lethargy, severe headache, rash, or altered mental status. — 6 points",
            ko:"항목 3. 탈수 정도 정량화: 지난 24시간 동안의 젖은 기저귀/배뇨 횟수, 마지막 배뇨 시점, 수분 섭취 유지 가능 여부, 지속적인 구토, 울 때 눈물 여부, 눈이 들어가 보이는지, 행동 변화 등을 구체적으로 확인합니다.",
            xEn:"Identifying red flags prevents missed surgical abdomen, intussusception, meningitis, or invasive bacterial infection.",
            xKo:"소변량 감소와 활동 수준 저하는 중등도에서 중증 탈수의 가장 신뢰할 수 있는 지표입니다. 이사례에서 10시간 동안 배뇨 없음은 즉각적인 평가가 필요한 중요한 소견입니다."
          },
          {
            id:"2-4-1-4",
            pts:6,
            en:"Item 4. Hydration-Focused Review of Systems: Asks about urine output, tears, thirst, activity level, dizziness, dry mouth, weight change. — 6 points",
            ko:"항목 4. 경구 섭취 능력 및 귀가 가능성 평가: 최근 수분 섭취 시도(종류, 양, 빈도), 수분 유지 가능 여부, 경구 재수화 용액의 이전 사용 여부를 확인합니다.",
            xEn:"In pediatric gastroenteritis, hydration status drives disposition and treatment decisions.",
            xKo:"경구 재수화가 가능한지 여부는 귀가 가능 여부를 직접적으로 결정합니다. 주스나 물과 같은 부적절한 수분 섭취는 삼투성 설사를 악화시킬 수 있습니다."
          },
          {
            id:"2-4-1-5",
            pts:4,
            en:"Item 5. Past Medical and Birth History: Reviews chronic illness, prior admissions for dehydration, metabolic disorders, growth pattern. — 4 points",
            ko:"항목 5. 전신 상태 및 활동 수준: 행동 변화(보채거나 무기력한지), 눈 맞춤, 놀이 여부, 달래기 용이 여부를 문진합니다.",
            xEn:"Underlying conditions increase risk for complications and influence threshold for admission.",
            xKo:"부모가 보고하는 활동 수준은 소아에서 탈수나 패혈증 등 전신 상태를 평가하는 가장 민감한 지표 중 하나입니다."
          },
          {
            id:"2-4-1-6",
            pts:3,
            en:"Item 6. Medication and Allergy History: Identifies recent medications (antiemetics, antibiotics, antipyretics) and allergies. — 3 points",
            ko:"항목 6. 발열 특성화: 발병 시점, 최고 체온, 오한 여부, 해열제 사용 및 반응을 확인합니다.",
            xEn:"Impacts management and differential (e.g., antibiotic- associated diarrhea).",
            xKo:"발열은 바이러스성 위장관염에서 흔하지만, 고열이 지속되는 경우 세균성 감염이나 다른 원인을 시사할 수 있습니다."
          },
          {
            id:"2-4-1-7",
            pts:2,
            en:"Item 7. Immunization Status: Confirms vaccines, especially rotavirus. — 2 points",
            ko:"항목 7. 노출 및 역학적 배경: 최근 여행력, 어린이집이나 가정 내 아픈 접촉자, 섭취한 식품(특히 날 것이나 덜 익힌 음식), 물의 출처를 확인합니다.",
            xEn:"Rotavirus vaccination status affects likelihood and severity of viral gastroenteritis.",
            xKo:"역학적 연결고리는 바이러스성 원인을 확인하고 식인성 병원체 가능성을 평가하는 데 도움이 됩니다. 어린이집 발생은 로타바이러스나 노로바이러스를 강력히 시사합니다."
          },
          {
            id:"2-4-1-8",
            pts:3,
            en:"Item 8. Social and Exposure History: Assesses daycare exposure, sick contacts, travel, food exposures, water sources. — 3 points",
            ko:"항목 8. 과거 병력, 약물력, 알레르기: 기저 질환(특히 면역억제, 선천성 심장 질환), 로타바이러스 예방접종 상태, 현재 복용 약물 및 알레르기를 확인합니다.",
            xEn:"Exposure history supports viral etiology and screens for bacterial/parasitic causes.",
            xKo:"기저 면역 억제 또는 심장 질환은 탈수 위험을 높이고 처치 결정에 영향을 미칩니다. 예방접종력은 로타바이러스 감염 가능성을 평가하는 데 중요합니다."
          },
        ],
        d2:[
          {
            id:"2-4-2-9",
            pts:15,
            en:"Item 9. Quantifies Degree of Dehydration: Specifically asks about number of wet diapers/voids in 24 hours, last urine output, ability to tolerate fluids, persistent vomiting, presence of tears, sunken eyes, and behavioral changes. — 15 points",
            ko:"항목 9. 탈수 정도 정량화: 지난 24시간 동안의 젖은 기저귀/배뇨 횟수, 마지막 소변 시간, 수분 유지 가능 여부, 지속적인 구토, 울 때 눈물 여부, 눈이 들어가 보이는지, 행동 변화를 구체적으로 확인합니다.",
            xEn:"Severity of dehydration determines need for oral rehydration vs IV fluids and possible admission. This is the highest-yield element in this case.",
            xKo:"이사례의 임상 결정(귀가 vs. 정맥 수액)은 탈수 정도에 달려 있습니다. 10시간 동안 배뇨 없음이라는 병력은 즉각적인 개입이 필요한 중요한 소견이므로 가장 높은 가중치를 부여합니다."
          },
          {
            id:"2-4-2-10",
            pts:8,
            en:"Item 10. Evaluates Oral Intake and Fluid Replacement Attempts: Clarifies type and amount of fluids offered (water, juice, oral rehydration solution), tolerance, and caregiver strategies. — 8 points",
            ko:"항목 10. 구토 및 설사의 외과적 위험 신호 선별: 담즙성 구토(녹색), 혈변, 심하거나 국소적인 복통, \"커런트 젤리\" 양상의 대변, 간헐적으로 달래기 어려운 울음을 배제합니다.",
            xEn:"Determines feasibility of oral rehydration therapy and identifies inappropriate fluids worsening diarrhea.",
            xKo:"담즙성 구토는 장염전/장회전 이상을 시사하며 응급 영상 검사가 필요합니다. 혈변은 세균성 장염이나 장중첩증을 시사합니다. 이러한 소견들을 놓치면 위험한 결과로 이어질 수 있습니다."
          },
          {
            id:"2-4-2-11",
            pts:8,
            en:"Item 11. Screens for Surgical Abdomen and Intussusception: Asks about episodic severe colicky pain, drawing up of legs, persistent focal tenderness, abdominal distension, bilious vomiting, or currant jelly stools. — 8 points",
            ko:"항목 11. 복통 특성화: 통증의 성격(경련성 vs. 지속성 vs. 국소성), 위치, 심한 정도, 악화 요인을 평가합니다.",
            xEn:"Critical to exclude surgical emergencies in toddlers presenting with vomiting and abdominal pain.",
            xKo:"전반적인 경련성 통증은 위장관염에서 전형적이지만, 국소적이거나 심한 통증은 외과적 복증을 시사합니다. 통증 패턴은 진단 범위를 좁히는 데 도움이 됩니다."
          },
          {
            id:"2-4-2-12",
            pts:8,
            en:"Item 12. Assesses for Invasive/Bacterial Gastroenteritis: Asks about bloody stools, high persistent fever, severe abdominal pain, recent travel, reptile exposure, undercooked foods. — 8 points",
            ko:"항목 12. 귀가 안전성 및 보호자 역량 평가: 보호자가 경구 재수화를 관리할 능력이 있는지, 악화 징후를 인식할 수 있는지, 필요 시 재내원 가능한지, 추적 진료 계획을 확인합니다.",
            xEn:"Identifies children needing stool studies, antibiotics, or closer monitoring.",
            xKo:"귀가 결정은 임상 소견뿐만 아니라 보호자의 신뢰도에도 달려 있습니다. 가정 관리 실패는 임상 악화와 마찬가지로 재내원의 원인이 됩니다."
          },
          {
            id:"2-4-2-13",
            pts:6,
            en:"Item 13. Evaluates Risk of Hypoglycemia or Metabolic Compromise: Screens for lethargy, tremors, seizures, prolonged poor intake, or underlying metabolic disease. — 6 points",
            ko:"항목 13. 적절한 수분 섭취 시도 평가: 이전에 제공된 수분의 종류와 양(ORS vs. 주스 vs. 물), 수분 유지 가능 여부, 집에서의 소량 씩 나누어 먹이기(분할 섭취) 시도 여부를 확인합니다.",
            xEn:"Toddlers are prone to hypoglycemia and metabolic acidosis with decreased intake.",
            xKo:"이전에 시도된 경구 재수화 방법을 아는 것은 가정에서의 치료가 실패했는지 여부를 판단하는 데 중요합니다. ORS가 아닌 수분 섭취는 혈청 삼투압을 악화시킬 수 있습니다."
          },
          {
            id:"2-4-2-14",
            pts:5,
            en:"Item 14. Reviews Frequency and Trend of Symptoms: Clarifies whether vomiting is improving or worsening, whether diarrhea frequency is increasing, and duration beyond expected viral course. — 5 points",
            ko:"항목 14. 복통과 관련된 대안적 진단 선별: 충수염(통증 이동, 식욕 부진, 발열 패턴), 장중첩증(간헐적 통증, 무기력, 혈변), 장폐색(복부 팽만, 담즙성 구토) 증상을 평가합니다.",
            xEn:"Symptom trajectory informs need for further evaluation or admission.",
            xKo:"구토와 설사가 있는 유아에서 수술이 필요한 병변을 놓치는 것은 치명적인 결과로 이어질 수 있습니다. 위장관염에 앞서 이러한 진단들을 배제하는 것은 필수적입니다."
          },
          {
            id:"2-4-2-15",
            pts:5,
            en:"Item 15. Assesses Household Impact and Caregiver Capacity: Determines caregiver ability to provide frequent small-volume rehydration, recognize worsening dehydration, and access follow-up care. — 5 points",
            ko:"항목 15. 가정 내 영향 및 보호자 관리 능력 평가: 보호자가 소량씩 자주 수분을 공급할 수 있는지, 탈수 악화를 인지할 수 있는지, 추적 진료에 접근할 수 있는지 여부를 확인합니다.",
            xEn:"Safe outpatient management depends on reliable caregivers and follow-up.",
            xKo:"안전한 외래 관리 여부는 신뢰할 수 있는 보호자와 적절한 추적 관찰 가능성에 크 게 의존한다."
          },
          {
            id:"2-4-2-16",
            pts:5,
            en:"Item 16. Identifies Predisposing or High-Risk Conditions: Asks about immunocompromise, chronic GI disease, renal disease, or prior severe dehydration episodes. — 5 points",
            ko:"항목 16. 소인 또는 고위험 상태 확인: 면역저하 상태, 만성 위장관 질환, 신장 질환, 이전의 중증 탈수 병력 여부를 확인한다.",
            xEn:"High-risk children may require lower threshold for labs, IV fluids, or admission.",
            xKo:"고위험 아동의 경우 검사 시행, 정맥 수액 치료, 또는 입원 결정의 기준이 더 낮아 질 수 있다."
          },
        ]
      },
    ]
  },
  {
    id: 3,
    en: "Case 3: Infant in respiratory distress — RSV bronchiolitis",
    ko: "사례 3: 호흡곤란을 보이는 영아 — RSV 세기관지염",
    vignette: {
      rows: [
        { en:"Chief Complaint", ko:"주 호소", val_en:"Cough, poor feeding, and increased work of breathing", val_ko:"기침, 수유 감소, 호흡 노력 증가" },
        { en:"History of Presenting Illness", ko:"현병력", val_en:"8-month-old boy with 2 days of rhinorrhea and cough, now with tachypnea, retractions, and decreased oral intake over the last 12 hours. No prior wheeze history. One wet diaper since morning. No vomiting or diarrhea. No known aspiration events.", val_ko:"8개월 남아로 2일 전부터 콧물과 기침이 있었으며, 지난 12시간 동안 빈호흡, 흉부 함몰, 경구 섭취 감소가 나타남. 이전에 천명 병력 없음. 오늘 아침 이후 젖은 기저귀 1회. 구토나 설사 없음. 알려진 흡인 사건 없음." },
        { en:"Past Medical History", ko:"과거 병력", val_en:"Unremarkable; full-term; no cardiac history.", val_ko:"특이사항 없음; 만삭 출생; 심장 질환 병력 없음." },
        { en:"Medications", ko:"복용 약물", val_en:"None; no home bronchodilators.", val_ko:"없음; 가정에서 사용한 기관지확장제 없음." },
        { en:"Allergies", ko:"알레르기", val_en:"No known drug allergies.", val_ko:"알려진 약물 알레르기 없음." },
        { en:"Family/Social History", ko:"사회력/가족력", val_en:"Attends nursery; older sibling recently had a cold. No smokers at home.", val_ko:"어린이집(보육시설) 이용 중; 형/누나가 최근 감기 증상 있었음. 가정 내 흡연자 없음." },
        { en:"Immunizations", ko:"예방접종", val_en:"Up-to-date for age.", val_ko:"연령에 맞게 접종 완료." },
        { en:"Review of Systems", ko:"계통별 문진", val_en:"Positive for rhinorrhea, cough, feeding difficulty, tachypnea; negative for apnea, cyanosis, fever >38.5°C, vomiting.", val_ko:"콧물, 기침, 수유 곤란, 빈호흡 있음; 무호흡, 청색증, 38.5°C 이상의 발열, 구토 없음." },
      ],
      vitals: [
        { en:"Age", ko:"연령", val_en:"8 months", val_ko:"8개월" },
        { en:"Temperature", ko:"체온", val_en:"37.8°C (36.5–37.5°C)", val_ko:"37.8°C (36.5–37.5°C)" },
        { en:"Heart Rate", ko:"심박수", val_en:"158 bpm (100–160 bpm)", val_ko:"158 bpm (100–160 bpm)" },
        { en:"Respiratory Rate", ko:"호흡수", val_en:"54 breaths/min (30–50 breaths/min) — tachypnea", val_ko:"54회/분 (30–50회/분) — 빈호흡" },
        { en:"Blood Pressure", ko:"혈압", val_en:"84/50 mmHg (70–100/50–65 mmHg)", val_ko:"84/50 mmHg (70–100/50–65 mmHg)" },
        { en:"SpO₂", ko:"SpO₂", val_en:"90% on room air (≥95%) — hypoxemia", val_ko:"90% 실내 공기 (≥95%) — 저산소증" },
      ],
      exam: [
        { en:"General", ko:"전반", val_en:"Alert but irritable; moderate respiratory distress", val_ko:"의식은 명료하나 보챔 있음; 중등도 호흡곤란" },
        { en:"HEENT", ko:"HEENT", val_en:"Nasal congestion; copious secretions; oral mucosa slightly dry", val_ko:"비충혈; 다량의 분비물; 구강 점막 약간 건조" },
        { en:"Respiratory", ko:"호흡기", val_en:"Nasal flaring; intercostal and subcostal retractions; diffuse wheezes and fine crackles bilaterally; prolonged expiratory phase", val_ko:"비익 확장; 늑간 및 늑하 함몰; 양측에서 전반적인 천명과 미세 수포음; 호기 연장" },
        { en:"Cardiovascular", ko:"심혈관", val_en:"Tachycardic; good peripheral pulses; no murmur", val_ko:"빈맥; 말초 맥박 양호; 심잡음 없음" },
        { en:"Skin", ko:"피부", val_en:"Warm, well perfused; capillary refill ~2–3 seconds", val_ko:"따뜻하고 말초 관류 양호; 모세혈관 재충만 약 2–3초" },
        { en:"Abdomen", ko:"복부", val_en:"Soft, nondistended; no hepatosplenomegaly", val_ko:"부드럽고 팽만 없음; 간비장비대 없음" },
        { en:"Neuro", ko:"신경", val_en:"Moves all extremities; no focal deficit", val_ko:"사지 움직임 정상; 국소 신경학적 결손 없음" },
      ],
    },
    rubrics: [
      {
        id:"3-1", label_en:"Rubric 1", label_ko:"기준표 1", d1pts:36, d2pts:64,
        threshold_en:"", threshold_ko:"",
        rationale_en:"Design Rationale for Domain Weighting: Domain 2 is weighted heavily (64/36) because bronchiolitis management in infants is overwhelmingly determined by case-specific factors elicited through history: respiratory trajectory, feeding capacity, hydration status, apnea risk, and the presence of established high-risk features. Domain 1 retains meaningful weight because birth history and prematurity screening carry unusually high case-specific significance in infant respiratory illness.",
        rationale_ko:"영역 가중치 설계 근거: 영아의 세기관지염 관리에서는 병력 청취를 통해 확인되는 사례 특이 요소—호흡 증상의 진행 양상, 수유 가능 여부, 수분 상태, 무호흡 위험, 그리고 고위험 인자의 존재—가 치료 결정에 큰 영향을 미치므로 영역 2에 더 높은 가중치(64/36)를 부여하였다.",
        d1desc_en:"This domain evaluates the candidate's ability to conduct a comprehensive general clinical history in the context of an infant with respiratory distress. Birth history and prematurity screening carry unusually high case-specific significance in infant respiratory illness.",
        d1desc_ko:"이 영역은 호흡곤란이 있는 영아의 맥락에서 포괄적인 일반 임상 병력을 청취하는 능력을 평가합니다. 출생력과 미숙아 여부 확인은 영아 호흡기 질환에서 매우 중요한 사례 특이적 의미를 가집니다.",
        d2desc_en:"This domain evaluates case-specific diagnostic history for infant bronchiolitis and respiratory distress (64 points).",
        d2desc_ko:"이 영역은 영아 세기관지염 및 호흡곤란에 대한 사례 특이적 진단 병력을 평가합니다 (64점).",
        d1:[
          {id:"3-1-1-1",pts:8,en:"Item 1. Presenting Complaint Characterization: Systematic exploration of cough (onset, character, progression, triggers), breathing difficulty (onset, trajectory, positional variation), and feeding difficulty (onset, degree of decline), including temporal relationships between symptoms.",ko:"항목 1. 주증상 특성 파악: 기침(발생 시점, 성상, 진행 양상, 유발 요인), 호흡곤란(발생 시점, 진행 경과, 자세에 따른 변화), 수유 곤란(발생 시점, 감소 정도)을 체계적으로 탐 색하고, 각 증상 간의 시간적 관계를 확인한다.",xEn:"In an infant who cannot verbalize, the caregiver's description of symptom onset, sequence, and trajectory is the primary diagnostic data source. Understanding that rhinorrhea preceded respiratory distress by 48 hours supports a typical bronchiolitis prodrome, while an abrupt onset would raise concern for foreign body or cardiac pathology. High weighting reflects foundational importance.",xKo:"자신의 증상을 표현할 수 없는 영아에서는 보호자가 설명하는 증상 발생 시점, 순 서, 진행 양상이 가장 중요한 진단 정보가 된다. 예를 들어 콧물이 48시간 먼저 나타난 후 호흡곤란이 발생했다면 전형적인 세기관지염의 전구 증상을 시사하지만, 증상이 갑 자기 시작되었다면 이물 흡인이나 심장 질환을 의심해야 한다. 이러한 기초 정보의 중요 성을 반영하여 높은 가중치를 부여하였다."},
          {id:"3-1-1-2",pts:7,en:"Item 2. Past Medical History: Inquiry into prematurity and gestational age, neonatal ICU admission, chronic lung disease (BPD), congenital heart disease, prior wheezing episodes, prior hospitalizations, and any history of airway anomalies.",ko:"항목 2. 과거 병력: 미숙아 여부 및 재태 연령, 신생아 중환자실 입원 병력, 만성 폐질환 (BPD), 선천성 심장 질환, 이전 천명 병력, 이전 입원 병력, 기도 기형 병력 여부를 확인 한다.",xEn:"This item receives elevated weighting because in bronchiolitis, the past medical history is a primary determinant of risk stratification. Prematurity (<37 weeks, especially <32 weeks), BPD, Disagree 비동의 hemodynamically significant congenital heart disease, and immunodeficiency are established high-risk features that directly influence disposition, monitoring intensity, and threshold for escalation. Failure to ask these questions represents a significant safety gap.",xKo:"세기관지염에서는 과거 병력이 위험도 평가의 핵심 요소이기 때문에 이 항목에 비교적 높은 가중치를 부여하였다. 미숙아 출생(<37주, 특히 <32주), 기관지폐이형성증 (BPD), 혈역학적으로 의미 있는 선천성 심장 질환, 면역결핍 등은 잘 알려진 고위험 인 자이며, 이는 처치 결정, 모니터링 강도, 치료 단계 상승의 기준에 직접적인 영향을 미친 다. 이러한 질문을 하지 않는 것은 환자 안전 측면에서 중요한 공백이 된다."},
          {id:"3-1-1-3",pts:5,en:"Item 3. Birth and Neonatal History: Gestational age, birth weight, mode of delivery, NICU stay, need for respiratory support at birth, and any neonatal respiratory complications.",ko:"항목 3. 출생 및 신생아 병력: 재태 연령, 출생 체중, 분만 방식, NICU 입원 여부, 출생 시 호흡 보조 필요 여부, 신생아기 호흡기 합병증 여부를 확인한다.",xEn:"This is separated from general PMH because of its outsized importance in infant respiratory illness. An infant born at 34 weeks with transient tachypnea may have subtly reduced respiratory reserve not captured by \"unremarkable PMH.\" The specific details of neonatal respiratory course inform baseline vulnerability to bronchiolitis.",xKo:"이 항목은 영아 호흡기 질환에서 매우 중요한 의미를 가지기 때문에 일반 과거 병력과 구분하여 평가한다. 예를 들어 34주에 태어나 일과성 빈호흡을 겪었던 영아는 “특 이사항 없는 과거 병력”으로 분류될 수 있지만 실제로는 호흡 예비력이 감소되어 있을 수 있다. 신생아기 호흡기 경과의 세부 정보는 세기관지염에 대한 기저 취약성을 판단하 는 데 도움이 된다."},
          {id:"3-1-1-4",pts:4,en:"Item 4. Medication and Allergy History: Current medications, any prior use of bronchodilators or inhaled therapies, palivizumab (Synagis) prophylaxis status, and drug allergies.",ko:"항목 4. 약물 및 알레르기 병력: 현재 복용 중인 약물, 이전 기관지확장제 또는 흡입 치료 사용 여부, 팔리비주맙(Synagis) 예방 투여 여부, 약물 알레르기를 확인한다.",xEn:"Palivizumab eligibility and receipt is directly relevant to RSV disease in high-risk infants. Prior bronchodilator use suggests previous wheezing episodes, which may shift the diagnosis toward reactive airway disease with a viral trigger rather than first-episode bronchiolitis, altering management. Allergy documentation is standard safety practice.",xKo:"팔리비주맙 예방 투여 여부는 고위험 영아에서 RSV 질환 위험과 직접적으로 관련 된다. 또한 이전 기관지확장제 사용 병력이 있다면 첫 번째 세기관지염이 아니라 바이러 스 유발 반응성 기도 질환일 가능성을 시사할 수 있어 치료 접근이 달라질 수 있다. 알레 르기 확인은 표준적인 환자 안전 절차이다."},
          {id:"3-1-1-5",pts:3,en:"Item 5. Immunization History: Confirmation of up-to-date vaccinations for age, with attention to pertussis (DTaP) vaccination and any RSV maternal or infant immunization if available.",ko:"항목 5. 예방접종 병력: 연령에 맞는 예방접종이 완료되었는지 확인하고, 특히 백일해 (DTaP) 예방접종 여부와 가능하다면 RSV 관련 예방접종(니르세비맙, 산모 RSV 백신 등)을 확인한다.",xEn:"Pertussis can mimic bronchiolitis in infants and should be considered if immunizations are incomplete. Newer RSV immunization products (nirsevimab, maternal RSV vaccine) are increasingly relevant; asking about these reflects current clinical awareness. Lower weighting reflects supporting rather than primary diagnostic value.",xKo:"영아에서 백일해는 세기관지염과 유사하게 나타날 수 있으므로 예방접종이 완료 되지 않았다면 감별 진단에 포함해야 한다. 또한 니르세비맙이나 산모 RSV 백신과 같은 새로운 RSV 예방 전략도 점점 중요해지고 있으며, 이에 대해 질문하는 것은 최신 임상 지식을 반영한다. 다만 주요 진단 요소라기보다는 보조적 정보이므로 낮은 가중치를 부 여하였다."},
          {id:"3-1-1-6",pts:4,en:"Item 6. Social and Family History: Household composition, daycare/nursery attendance, household smokers, parental ability to monitor and return if worsening, distance from hospital, and family history of atopy/asthma.",ko:"항목 6. 사회력 및 가족력: 가족 구성, 어린이집/보육시설 이용 여부, 가정 내 흡연자, 증상 악화 시 보호자가 관찰하고 재내원할 수 있는지 여부, 병원까지의 거리, 아토피/천식 의 가족력을 확인한다.",xEn:"Environmental tobacco smoke exposure worsens bronchiolitis severity. Daycare attendance increases infectious exposure risk. Family history of atopy may influence the likelihood of recurrent wheezing beyond the index episode. Crucially, the family's capacity for home monitoring and access to emergency care directly determines the safety of discharge in borderline cases.",xKo:"환경적 담배 연기 노출은 세기관지염의 중증도를 악화시킬 수 있다. 어린이집 이 용은 감염 노출 위험을 증가시킨다. 또한 아토피 가족력은 이후 반복적인 천명 발생 가능성과 관련될 수 있다. 무엇보다 보호자가 가정에서 상태를 관찰하고 필요 시 병원에 접근할 수 있는지 여부는 경계 상황에서 안전한 퇴원 결정에 직접적인 영향을 미친다."},
          {id:"3-1-1-7",pts:3,en:"Item 7. Review of Systems: Targeted screening beyond the respiratory presentation — GI symptoms (vomiting, diarrhea), fever pattern, rash, irritability/consolability, and any urinary symptoms.",ko:"항목 7. 계통별 문진(Review of Systems): 호흡기 증상 외에도 위장관 증상(구토, 설사), 발열 양상, 발진, 보챔/달래짐 여부, 배뇨 증상 등을 선별적으로 확인한다.",xEn:"Concurrent viral gastroenteritis worsens dehydration risk. Unexplained irritability may suggest meningitis or intussusception as alternative diagnoses. Rash may point toward specific viral etiologies or Kawasaki disease in the right context. The review of systems serves as a safety net against diagnostic anchoring.",xKo:"동반된 바이러스성 위장관염은 탈수 위험을 증가시킬 수 있다. 원인을 설명하기 어려운 심한 보챔은 수막염이나 장중첩증과 같은 다른 질환을 시사할 수 있다. 발진은 특정 바이러스 감염이나 상황에 따라 가와사키병을 시사할 수 있다. 이러한 계통별 문진 은 특정 진단에 지나치게 고정되는 것을 방지하는 안전망 역할을 한다."},
          {id:"3-1-1-8",pts:2,en:"Item 8. Structured and Organized Approach: History obtained efficiently and logically, demonstrating appropriate urgency for a child in respiratory distress while remaining thorough.",ko:"항목 8. 체계적이고 조직적인 접근: 호흡곤란이 있는 영아 상황에 맞는 긴급성을 고려 하면서도 효율적이고 논리적인 순서로 병력을 청취한다.",xEn:"In an infant with active respiratory distress and hypoxemia, the clinician must balance the need for a complete history against the urgency of initiating supportive care. An excellent trainee obtains critical information quickly (risk factors, trajectory, feeding, urine output) while allowing concurrent assessment and management. This process marker reflects emergency-appropriate prioritization.",xKo:"호흡곤란과 저산소증이 있는 영아에서는 완전한 병력 청취와 즉각적인 지지 치료 시작 사이의 균형이 중요하다. 우수한 수련의는 위험 요인, 증상 진행 경과, 수유 상태, 소변량과 같은 핵심 정보를 신속히 파악하면서 동시에 평가와 처치를 병행한다. 이 항목 은 응급 상황에 적합한 우선순위 설정 능력을 반영하는 과정 평가 지표이다."},
        ],
        d2:[
          {id:"3-1-2-9",pts:12,en:"Item 9. Respiratory Trajectory and Illness Timeline: Detailed reconstruction of the illness course — prodromal symptoms, when breathing difficulty began, whether it is worsening/stable/improving, rapidity of deterioration, and current peak versus earlier severity.",ko:"항목 9. 호흡기 증상 진행 경과 및 질병 시간 경과: 전구 증상, 호흡곤란이 시작된 시점, 증상이 악화되는지/안정적인지/호전되는지, 악화 속도, 현재 상태가 이전보다 가장 심한 상태인지 등을 포함하여 질병 경과를 상세히 재구성한다.",xEn:"This is the most important historical element in this case. Bronchiolitis typically peaks at days 3–5 of illness; an infant at day 2 with moderate distress is likely still deteriorating, which has direct implications for disposition and anticipated resource needs. Rapid deterioration raises concern for complications (bacterial superinfection, pneumothorax) or alternative diagnoses. An infant already past peak who is improving may be a safer candidate for observation. This receives the highest individual weighting because it anchors the clinical decision-making framework.",xKo:"이사례에서 가장 중요한 병력 요소이다. 세기관지염은 일반적으로 질병 발생 후 3–5일째에 증상이 가장 심해지며, 질병 2일째에 중등도 호흡곤란이 있는 영아는 아직 상태가 더 악화될 가능성이 높다. 이는 처치 결정과 필요한 의료 자원 예측에 직접적인 영향을 미친다. 급격한 악화는 세균성 중복 감염, 기흉 또는 다른 진단 가능성을 시사할 수 있다. 반대로 이미 증상 정점을 지나 호전 중인 영아는 관찰 후 귀가가 더 안전할 수 있다. 이러한 이유로 임상 의사결정의 기준이 되는 핵심 요소로서 가장 높은 개별 가중 치를 부여하였다."},
          {id:"3-1-2-10",pts:12,en:"Item 10. Feeding Assessment: Detailed inquiry into type of feeding (breast/bottle/solids), baseline intake volume and frequency, current intake (volume per feed, proportion of usual intake), feeding duration and effort, choking/gagging/coughing with feeds, and time of last adequate feed.",ko:"항목 10. 수유 상태 평가: 수유 방식(모유/젖병/이유식), 평소 섭취량과 빈도, 현재 섭취 량(회당 섭취량, 평소 대비 비율), 수유 시간과 노력 정도, 수유 중 질식·구역·기침 여부, 마지막으로 충분히 수유한 시점을 상세히 확인한다.",xEn:"Feeding ability is the most reliable proxy for respiratory reserve in an infant with bronchiolitis. An infant who can only take 50% of usual feeds is working too hard to breathe to coordinate suck-swallowbreathe. This is a primary determinant of admission versus discharge in every bronchiolitis guideline. The detailed quantification — not just \"feeding less\" but how much less, for how long, with what effort — separates adequate from excellent history-taking. Equal highest weighting reflects its direct and immediate management impact.",xKo:"세기관지염이 있는 영아에서 수유 능력은 호흡 예비력을 가장 잘 반영하는 지표입니다. 평소의 50% 정도만 수유할 수 있는 영아는 빨기-삼키기-호흡을 동시에 조절하기에 호흡 부담이 너무 큰 상태일 가능성이 높다. 이는 모든 세기관지염 진료 지침에서 입원 여부를 결정하는 주요 기준이다. 단순히 “수유가 줄었다”는 수준이 아니라 얼마나 줄었 는지, 얼마나 오래 지속되었는지, 어떤 노력으로 수유하는지를 정량적으로 확인하는 것 이 우수한 병력 청취의 기준이 된다. 이러한 요소가 처치 결정에 직접적이고 즉각적인 영향을 미치므로 가장 높은 가중치를 부여하였다."},
          {id:"3-1-2-11",pts:8,en:"Item 11. Hydration and Output Assessment: Wet diaper count over the preceding 12–24 hours compared to baseline, urine color if noted, tears when crying, and overall fluid balance estimation.",ko:"항목 11. 수분 상태 및 배설량 평가: 지난 12–24시간 동안의 젖은 기저귀 수를 평소와 비교하여 확인하고, 소변 색 변화가 있었는지, 울 때 눈물이 나는지, 전반적인 체액 균형 상태를 평가한다.",xEn:"Dehydration from reduced intake compounded by increased insensible losses from tachypnea is a common and dangerous complication of bronchiolitis. The finding of only one wet diaper since morning indicates significant reduction in output. This directly informs the need for IV or nasogastric fluid supplementation and contributes to admission criteria. High weighting reflects direct management relevance.",xKo:"세기관지염에서는 섭취 감소와 빈호흡으로 인한 불감 수분 손실 증가가 동시에 발생하여 탈수가 흔하고 위험한 합병증이 될 수 있다. 이사례에서처럼 아침 이후 젖은 기 저귀가 한 번뿐이라는 것은 배설량이 크게 감소했음을 시사한다. 이는 정맥 또는 비위관 수액 보충 필요 여부를 판단하고 입원 기준을 결정하는 데 직접적인 영향을 미친다. 따 라서 치료 결정과의 직접적인 관련성을 반영하여 높은 가중치를 부여하였다."},
          {id:"3-1-2-12",pts:8,en:"Item 12. Apnea and Acute Life-Threatening Event Screening: Direct questioning about witnessed pauses in breathing, color changes (pallor, cyanosis, dusky episodes), limpness or unresponsiveness, choking episodes, and any events requiring stimulation to resume breathing.",ko:"항목 12. 무호흡 및 급성 생명 위협 사건 선별: 보호자가 목격한 호흡 정지, 색 변화(창 백, 청색증, 검붉은 색 변화), 축 늘어짐 또는 반응 저하, 질식 에피소드, 호흡을 다시 시 작시키기 위해 자극이 필요했던 사건이 있었는지 직접적으로 질문한다.",xEn:"Apnea is the most feared complication of bronchiolitis in young infants and is an absolute indication for admission with continuous monitoring. Caregivers may not spontaneously volunteer subtle apneic episodes or may describe them as \"funny breathing\" or \"going quiet.\" Active, directed questioning is essential — this is a question that must be asked in every case. High weighting reflects its critical safety importance despite the fact that this infant is 8 months (lower apnea risk than neonates).",xKo:"무호흡은 어린 영아에서 세기관지염의 가장 우려되는 합병증이며, 발생 시 지속적 인 모니터링을 위한 입원의 절대적 적응증이 된다. 보호자는 미묘한 무호흡 에피소드를 자발적으로 보고하지 않거나 “이상한 호흡” 또는 “조용해짐”으로 표현할 수 있다. 따라 서 적극적이고 구체적인 질문이 필수적이며, 모든 사례에서 반드시 확인해야 하는 항목 이다. 이 영아가 8개월로 신생아보다 무호흡 위험이 낮더라도 환자 안전상 매우 중요한 요소이므로 높은 가중치를 부여하였다."},
          {id:"3-1-2-13",pts:5,en:"Item 13. Epidemiological Context: Sick contacts (particularly the older sibling's illness timeline and symptoms), nursery/daycare outbreaks, seasonality awareness, and exposure to known RSV or influenza cases.",ko:"항목 13. 역학적 배경: 아픈 접촉자(특히 형제자매의 증상과 발생 시점), 어린이집/보육 시설 내 집단 발생 여부, 계절적 유행 인식, RSV 또는 인플루엔자 환자와의 접촉 여부를 확인한다.",xEn:"An older sibling with a recent cold is highly typical for RSV household transmission and strongly supports the clinical diagnosis. Understanding the contact's illness timeline helps estimate where the infant is in the disease course. Nursery outbreaks may identify the circulating pathogen. This is diagnostically supportive rather than managementaltering, warranting moderate weight.",xKo:"최근 감기 증상이 있었던 형제자매는 RSV의 가정 내 전파에서 매우 흔한 양상이 며 임상적 진단을 강하게 지지한다. 접촉자의 질병 발생 시점을 이해하면 영아가 질병 경과 중 어느 단계에 있는지 추정하는 데 도움이 된다. 어린이집 집단 발생은 유행 중인 병원체를 파악하는 단서가 될 수 있다. 다만 이는 진단을 보조하는 정보로, 치료 결정을 직접적으로 바꾸는 요소는 아니므로 중간 수준의 가중치를 부여하였다."},
          {id:"3-1-2-14",pts:7,en:"Item 14. Risk Factor Identification for Severe Bronchiolitis: Specific inquiry into prematurity (<37 weeks), age <3 months, low birth weight, chronic lung disease, congenital heart disease, neuromuscular disease, immunodeficiency, and Down syndrome.",ko:"항목 14. 중증 세기관지염 위험 요인 확인: 미숙아 출생(<37주), 연령 <3개월, 저체중 출생, 만성 폐질환, 선천성 심장 질환, 신경근 질환, 면역결핍, 다운증후군 여부를 구체 적으로 확인한다.",xEn:"While partially overlapping with PMH, this item specifically evaluates whether the clinician systematically screens for established risk factors for severe bronchiolitis as a deliberate clinical reasoning step. Guidelines (AAP, NICE, CPS) identify these risk factors as key determinants of management intensity. A clinician who asks \"was the baby born early?\" as part of risk stratification demonstrates case-specific reasoning beyond routine history-taking. Substantial weighting reflects guideline-level importance.",xKo:"일부 항목은 과거 병력과 겹치지만, 이 항목은 임상의가 중증 세기관지염의 확립 된 위험 요인을 체계적으로 선별하는지를 평가한다. AAP, NICE, CPS 등의 진료 지침 에서는 이러한 위험 요인을 치료 강도와 처치 결정을 좌우하는 핵심 요소로 제시한다. 예를 들어 “아기가 미숙아로 태어났나요?”와 같은 질문을 위험도 평가 과정에서 명확히 하는 것은 단순한 병력 청취를 넘어 사례 특이적 임상 추론을 보여준다. 이러한 지침 수 준의 중요성을 반영하여 비교적 높은 가중치를 부여하였다."},
          {id:"3-1-2-15",pts:4,en:"Item 15. Environmental and Home Factors Relevant to Respiratory Illness: Household tobacco smoke exposure, use of wood-burning stoves or incense, pets, mold or damp housing conditions, and number of household members.",ko:"항목 15. 호흡기 질환과 관련된 환경 및 가정 요인: 가정 내 담배 연기 노출, 장작 난로 또는 향 사용, 반려동물, 곰팡이 또는 습한 주거 환경, 가구 구성원 수 등을 확인한다.",xEn:"Environmental smoke exposure is an established risk factor for bronchiolitis severity and recurrent wheezing. Overcrowded households increase transmission risk. These factors are modifiable and their identification contributes to both acute management context and discharge counseling. Moderate weighting reflects contributing rather than primary importance.",xKo:"환경적 담배 연기 노출은 세기관지염의 중증도와 반복적인 천명의 위험을 높이는 것으로 알려져 있다. 또한 가구 구성원이 많은 환경은 감염 전파 위험을 증가시킨다. 이 러한 요인들은 수정 가능한 요소이며, 이를 확인하는 것은 급성 관리 맥락을 이해하고 퇴원 시 교육 및 예방 상담에 도움을 준다. 주요 결정 요인이라기보다는 기여 요인이므 로 중간 수준의 가중치를 부여하였다."},
          {id:"3-1-2-16",pts:5,en:"Item 16. Differential Diagnosis–Oriented Questioning: Targeted questions to exclude foreign body aspiration (sudden onset, choking event, witnessed aspiration), cardiac failure (diaphoresis with feeding, failure to thrive, known murmur), pertussis (paroxysmal cough, post-tussive emesis, apnea without prodrome), and pneumonia (high persistent fever, focal symptoms, toxic appearance).",ko:"항목 16. 감별 진단을 위한 질문: 이물 흡인(갑작스러운 발병, 질식 사건, 목격된 흡인), 심부전(수유 시 발한, 성장 부진, 알려진 심잡음), 백일해(발작적 기침, 기침 후 구토, 전 구 증상 없는 무호흡), 폐렴(지속적인 고열, 국소 증상, 중독성 외관)을 배제하기 위한 표 적 질문을 한다.",xEn:"While the clinical picture is classic for bronchiolitis, the competent clinician must actively consider and exclude mimics. Foreign body aspiration can present identically in this age group and is a timecritical diagnosis. Undiagnosed congenital heart disease may present for the first time during a respiratory illness when the additional demand overwhelms marginal cardiac reserve. Asking about sudden onset, choking episodes, diaphoresis with feeding, and growth trajectory reflects mature diagnostic reasoning.",xKo:"임상 양상이 세기관지염에 전형적이더라도 유능한 임상의는 유사 질환을 적극적 으로 고려하고 배제해야 한다. 이물 흡인은 이 연령대에서 동일한 증상으로 나타날 수 있으며 시간에 민감한 진단이다. 또한 진단되지 않은 선천성 심장 질환은 호흡기 질환으 로 인해 심장 예비력이 한계에 도달하면서 처음으로 나타날 수 있다. 갑작스러운 발병 여부, 질식 에피소드, 수유 시 발한, 성장 경과 등을 질문하는 것은 성숙한 임상적 추론 을 반영한다."},
          {id:"3-1-2-17",pts:3,en:"Item 17. Sleep and Positional Factors: How the infant has been sleeping (position, duration, wakefulness), whether distress worsens when supine, and parental overnight observations of breathing pattern.",ko:"항목 17. 수면 및 체위 관련 요인: 영아가 어떻게 잠을 자고 있는지(자세, 수면 지속 시 간, 각성 여부), 바로 누웠을 때 호흡 곤란이 악화되는지, 밤 동안 보호자가 관찰한 호흡 양상에 대해 확인한다.",xEn:"Infants with bronchiolitis often worsen when supine due to increased nasal secretion pooling and airway narrowing. Parental reports of overnight worsening, frequent waking, or inability to lie flat provide valuable information about trajectory and severity that may not be apparent during a daytime emergency department snapshot. Lower weighting reflects supplementary value.",xKo:"세기관지염이 있는 영아는 비강 분비물의 축적과 기도 협착 증가로 인해 바로 누 운 자세에서 증상이 악화되는 경우가 많다. 밤 동안 증상이 악화되었는지, 자주 깨는지, 바로 누워 있지 못하는지에 대한 보호자의 관찰은 낮 시간 응급실 평가에서는 드러나지 않을 수 있는 질병의 경과와 중증도를 파악하는 데 중요한 단서를 제공한다. 다만 보조 적인 정보이므로 낮은 가중치를 부여하였다."},
        ],
      },
      {
        id:"3-2", label_en:"Rubric 2", label_ko:"기준표 2", d1pts:50, d2pts:50,
        threshold_en:"", threshold_ko:"",
        rationale_en:"", rationale_ko:"",
        d1desc_en:"This domain evaluates core history-taking skills applicable across all pediatric emergency presentations.",
        d1desc_ko:"이 영역은 모든 소아 응급 상황에 적용 가능한 핵심 병력 청취 기술을 평가합니다.",
        d2desc_en:"This domain evaluates case-specific diagnostic history for RSV bronchiolitis.",
        d2desc_ko:"이 영역은 RSV 세기관지염에 대한 사례 특이적 진단 병력을 평가합니다.",
        d1:[
          {id:"3-2-1-1",pts:5,en:"Item 1. Chief Complaint: Clearly elicits and articulates the primary presenting problem(s) in patient's/family's own words.",ko:"항목 1. 주 호소: 환자/보호자의 표현 그대로 주요 호소 문제를 명확히 확인하고 기술합니다.",xEn:"Establishes encounter focus; foundational and routinely expected, modest weight.",xKo:"진료의 초점을 설정하는 기본 단계로, 모든 병력 청취의 기초가 되는 항목이다. 일 반적으로 항상 수행되는 요소이므로 비교적 낮은 가중치를 부여하였다."},
          {id:"3-2-1-2",pts:12,en:"Item 2. History of Presenting Illness: Systematically explores onset, timing, duration, severity, progression, aggravating/alleviating factors, and associated symptoms using a structured approach (e.g., OPQRST).",ko:"항목 2. 현병력: 발병 시점, 시간 경과, 지속 기간, 중증도, 진행 양상, 악화/완화 요인, 동반 증상을 구조화된 접근법(예: OPQRST)을 사용하여 체계적으로 탐색한다.",xEn:"Captures illness trajectory for urgency in pediatric EM; core to all differentials, highest general weight.",xKo:"소아 응급의학에서 질환의 경과와 악화 속도를 파악하는 핵심 요소이며, 모든 감 별 진단의 중심이 되는 정보이다. 일반 병력 항목 중 가장 높은 가중치를 부여하였다."},
          {id:"3-2-1-3",pts:7,en:"Item 3. Past Medical History: Inquires about chronic illnesses, prior hospitalizations, surgeries, birth/developmental history, and previous similar episodes.",ko:"항목 3. 과거 병력: 만성 질환, 이전 입원 또는 수술, 출생 및 발달 병력, 이전에 유사한 증상이 있었는지 여부를 확인한다.",xEn:"Identifies risks or patterns affecting management; moderate for baseline stratification.",xKo:"치료 계획에 영향을 줄 수 있는 위험 요인이나 질환 패턴을 파악하는 데 중요하며, 기본적인 위험도 평가를 위해 중간 수준의 가중치를 부여하였다."},
          {id:"3-2-1-4",pts:4,en:"Item 4. Medications: Documents current prescriptions, over-the-counter drugs, recent antibiotics, and adherence.",ko:"항목 4. 복용 약물: 현재 처방약, 일반의약품, 최근 항생제 사용 여부, 복약 순응도를 확인한다.",xEn:"Guides therapy and avoids interactions; straightforward, low weight.",xKo:"치료 계획 수립과 약물 상호작용 예방에 도움을 주는 기본적인 항목으로, 비교적 단순한 정보이므로 낮은 가중치를 부여하였다."},
          {id:"3-2-1-5",pts:4,en:"Item 5. Allergies: Asks about drug/food allergies, adverse reactions, and anaphylaxis history.",ko:"항목 5. 알레르기: 약물 또는 음식 알레르기, 이상 반응, 아나필락시스 병력을 확인한다.",xEn:"Ensures prescribing safety; low weight paired with medications.",xKo:"처방의 안전성을 보장하기 위한 필수 확인 사항이며, 복용 약물 항목과 함께 낮은 가중치를 부여하였다."},
          {id:"3-2-1-6",pts:4,en:"Item 6. Immunizations: Confirms status, recent vaccines, and gaps relevant to infectious risks.",ko:"항목 6. 예방접종: 예방접종 상태, 최근 접종 여부, 감염 위험과 관련된 미접종 여부를 확인한다.",xEn:"Critical in pediatrics for context; low as often documented.",xKo:"소아 진료에서 중요한 배경 정보이지만, 대부분 이미 기록되어 있는 경우가 많아 낮은 가중치를 부여하였다."},
          {id:"3-2-1-7",pts:5,en:"Item 7. Family History: Explores hereditary conditions and relevant familial illnesses.",ko:"항목 7. 가족력: 유전 질환 및 관련 있는 가족 내 질환 여부를 확인한다.",xEn:"Uncovers genetic risks; pediatric-relevant, moderate weight.",xKo:"유전적 위험 요인을 파악하는 데 중요하며, 소아 환자에서 특히 의미가 있어 중간 수준의 가중치를 부여하였다."},
          {id:"3-2-1-8",pts:4,en:"Item 8. Social History: Assesses home environment, caregivers, school/daycare/nursery exposure, and habits.",ko:"항목 8. 사회력: 가정 환경, 보호자, 학교/어린이집/보육시설 노출, 생활 습관 등을 확인 한다.",xEn:"Contextualizes adherence/exposures; supportive, low weight.",xKo:"치료 순응도와 감염 노출 등의 맥락을 이해하는 데 도움이 되는 보조적 정보이므 로 낮은 가중치를 부여하였다."},
          {id:"3-2-1-9",pts:5,en:"Item 9. Review of Systems: Performs age-appropriate screening for unrelated symptoms.",ko:"항목 9. 계통별 문진: 연령에 맞게 관련 없는 증상에 대해서도 선별적으로 확인한다.",xEn:"Safety net for comorbidities; moderate for comprehensiveness.",xKo:"동반 질환이나 다른 문제를 놓치지 않기 위한 안전망 역할을 하며, 전반적인 평가 의 완전성을 위해 중간 수준의 가중치를 부여하였다."},
        ],
        d2:[
          {id:"3-2-2-10",pts:12,en:"Item 10. Respiratory Symptoms: Details rhinorrhea, cough quality/duration, progression to distress (tachypnea, retractions, flaring, wheeze), and prior respiratory episodes.",ko:"항목 10. 호흡기 증상: 콧물, 기침의 양상과 지속 기간, 호흡곤란으로의 진행(빈호흡, 함몰 호흡, 비익 확장, 천명), 이전 호흡기 증상 여부를 상세히 확인한다.",xEn:"Core to bronchiolitis diagnosis and severity scoring (e.g., RDAI); highest weight for guiding respiratory support.",xKo:"세기관지염의 진단과 중증도 평가(예: RDAI)에 핵심적인 요소이며, 호흡기 보조 치료 필요 여부를 결정하는 데 직접적인 영향을 미친다. 따라서 가장 높은 가중치를 부 여하였다."},
          {id:"3-2-2-11",pts:12,en:"Item 11. Feeding and Hydration Status: Probes oral intake volume/frequency, wet diapers/urine output, feeding refusal, and dehydration signs (tears, activity).",ko:"항목 11. 수유 및 수분 상태: 경구 섭취량과 빈도, 젖은 기저귀/소변 배출량, 수유 거부 여부, 탈수 징후(눈물, 활동성 등)를 확인한다.",xEn:"Critical in infants for dehydration/hypoglycemia risk; high weight drives fluid management and admission.",xKo:"영아에서 탈수와 저혈당 위험을 평가하는 데 매우 중요하며, 수액 치료와 입원 여 부를 결정하는 핵심 요소이므로 높은 가중치를 부여하였다."},
          {id:"3-2-2-12",pts:10,en:"Item 12. Exposure History: Inquires about sick contacts (siblings/nursery), recent upper respiratory illnesses, and seasonality.",ko:"항목 12. 노출력: 아픈 접촉자(형제자매/어린이집), 최근 상기도 감염, 계절적 유행 여 부를 확인한다.",xEn:"Confirms viral etiology (RSV); substantial for targeted testing and isolation.",xKo:"바이러스성 원인(RSV)을 확인하는 데 도움이 되며, 검사 선택과 격리 조치에 중요한 정보를 제공하므로 비교적 높은 가중치를 부여하였다."},
          {id:"3-2-2-13",pts:8,en:"Item 13. Red Flag Screening: Explores apnea, cyanosis episodes, high fever, grunting, or lethargy to exclude alternatives.",ko:"항목 13. 위험 신호 선별: 무호흡, 청색증 에피소드, 고열, 신음 호흡(grunting), 무기 력 여부를 확인하여 다른 질환 가능성을 배제한다.",xEn:"Rules out pertussis, cardiac disease, or bacterial pneumonia; key for disposition safety.",xKo:"백일해, 심장 질환, 세균성 폐렴 등의 가능성을 배제하기 위한 중요한 단계이며, 안전한 처치 결정과 환자 배치에 핵심적인 역할을 하므로 높은 가중치를 부여하였다."},
          {id:"3-2-2-14",pts:5,en:"Item 14. Environmental Risks: Assesses secondhand smoke, allergens, or home irritants.",ko:"항목 14. 환경적 위험 요인: 간접흡연, 알레르겐, 가정 내 자극 물질 노출 여부를 확인합니다.",xEn:"Modifiable factors worsening bronchiolitis; moderate for prevention counseling.",xKo:"이러한 요인은 세기관지염을 악화시킬 수 있는 수정 가능한 요소로, 예방 및 퇴원 후 상담에 중요하므로 중간 수준의 가중치를 부여하였다."},
          {id:"3-2-2-15",pts:3,en:"Item 15. Cardiac/Atopy History: Screens for congenital heart disease symptoms or personal/family atopy/asthma.",ko:"항목 15. 심장 질환 및 아토피 병력: 선천성 심장 질환 관련 증상 여부와 개인 또는 가족의 아토피/천식 병력을 확인한다.",xEn:"Differentiates from wheezy mimics; lower weight as less common but confirmatory.",xKo:"천명이 동반되는 다른 질환과의 감별에 도움이 되는 정보이며, 비교적 드물고 보 조적인 확인 요소이므로 낮은 가중치를 부여하였다."},
        ],
      },
      {
        id:"3-3", label_en:"Rubric 3", label_ko:"기준표 3", d1pts:40, d2pts:60,
        threshold_en:"", threshold_ko:"",
        rationale_en:"", rationale_ko:"",
        d1desc_en:"This domain evaluates the candidate's ability to obtain a complete, structured general clinical history applicable to any pediatric emergency presentation.",
        d1desc_ko:"이 영역은 모든 소아 응급 상황에 적용 가능한 완전하고 구조화된 일반 임상 병력을 청취하는 능력을 평가합니다.",
        d2desc_en:"This domain evaluates case-specific diagnostic history for infant bronchiolitis.",
        d2desc_ko:"이 영역은 영아 세기관지염에 대한 사례 특이적 진단 병력을 평가합니다.",
        d1:[
          {id:"3-3-1-1",pts:8,en:"Item 1. Establishes Chief Concern and Symptom Timeline: Clearly defines onset and progression of rhinorrhea, cough, increased work of breathing, and feeding decline; clarifies sequence (URI symptoms preceding respiratory distress).",ko:"항목 1. 주 호소 및 증상 경과 확인: 콧물, 기침, 호흡곤란 증가, 수유 감소의 발병 시점 과 진행 양상을 명확히 확인하고, 상기도 감염 증상 이후 호흡 곤란이 발생한 순서를 파 악한다.",xEn:"Temporal progression from upper respiratory symptoms to lower airway involvement is classic for bronchiolitis and supports diagnostic reasoning.",xKo:"상기도 감염 증상에서 하기도 침범으로 진행되는 시간적 경과는 세기관지염의 전 형적인 양상이며, 임상적 진단 추론을 뒷받침하는 중요한 근거가 된다."},
          {id:"3-3-1-2",pts:8,en:"Item 2. Characterizes Respiratory Symptoms in Detail: Explores cough quality, wheeze, noisy breathing, grunting, retractions, apnea episodes, cyanosis, and sleep disturbance.",ko:"항목 2. 호흡기 증상 상세 평가: 기침의 양상, 천명, 거친 호흡음, 신음 호흡, 함몰 호흡, 무호흡 에피소드, 청색증, 수면 장애 여부를 확인한다.",xEn:"Detailed respiratory characterization helps assess severity and distinguish bronchiolitis from asthma, pneumonia, or foreign body aspiration.",xKo:"호흡기 증상을 구체적으로 평가하면 중증도를 판단하고 세기관지염을 천식, 폐렴, 이물 흡인 등과 감별하는 데 도움이 된다."},
          {id:"3-3-1-3",pts:6,en:"Item 3. Assesses Feeding and Hydration Status: Quantifies oral intake (percentage of usual feeds), duration of feeds, fatigue with feeding, number of wet diapers, emesis with coughing.",ko:"항목 3. 수유 및 수분 상태 평가: 경구 섭취량(평소 수유량 대비 비율), 수유 시간, 수유 시 피로 여부, 젖은 기저귀 수, 기침과 동반된 구토 여부를 확인한다.",xEn:"In infants, feeding tolerance is a key marker of respiratory compromise and admission need.",xKo:"영아에서는 수유 가능 여부가 호흡기 기능 저하를 평가하는 중요한 지표이며, 입원 필요성을 판단하는 데 핵심적인 요소이다."},
          {id:"3-3-1-4",pts:6,en:"Item 4. Screens for Red-Flag Symptoms: Specifically asks about apnea, cyanosis, lethargy, poor responsiveness, persistent hypoxia, or signs of exhaustion.",ko:"항목 4. 위험 신호 선별: 무호흡, 청색증, 무기력, 반응 저하, 지속적인 저산소증, 탈진 징후가 있는지 구체적으로 확인한다.",xEn:"Early recognition of impending respiratory failure is critical in infants.",xKo:"영아에서 임박한 호흡부전을 조기에 인지하는 것은 매우 중요하다."},
          {id:"3-3-1-5",pts:5,en:"Item 5. Past Medical and Birth History: Elicits prematurity, chronic lung disease, congenital heart disease, prior NICU stay, prior wheezing episodes.",ko:"항목 5. 과거 병력 및 출생 병력: 미숙아 출생 여부, 만성 폐질환, 선천성 심장 질환, 과거 NICU 입원, 이전 천명 에피소드 여부를 확인한다.",xEn:"Comorbidities significantly increase risk of severe RSV disease and influence disposition.",xKo:"이러한 동반 질환은 중증 RSV 질환의 위험을 크게 증가시키며, 처치 결정과 환자 배치에 영향을 미친다."},
          {id:"3-3-1-6",pts:2,en:"Item 6. Medication and Allergy History: Identifies prior bronchodilator use, steroid exposure, or medication reactions.",ko:"항목 6. 약물 및 알레르기 병력: 이전 기관지확장제 사용, 스테로이드 노출 여부, 약물 이상 반응을 확인한다.",xEn:"Helps distinguish recurrent wheeze/asthma phenotype and informs management decisions.",xKo:"반복적인 천명이나 천식 표현형을 구분하는 데 도움이 되며 치료 결정에 참고가 된다."},
          {id:"3-3-1-7",pts:3,en:"Item 7. Immunization and Prophylaxis History: Confirms routine vaccines and asks about RSV monoclonal prophylaxis (if eligible).",ko:"항목 7. 예방접종 및 예방요법 병력: 정기 예방접종 여부를 확인하고, 대상이 되는 경우 RSV 단클론 항체 예방요법을 받았는지 확인한다.",xEn:"High-risk infants may have received RSV prophylaxis; vaccination status contributes to overall infectious risk profile.",xKo:"고위험 영아는 RSV 예방요법을 받았을 수 있으며, 예방접종 상태는 전반적인 감염 위험 평가에 도움이 된다."},
          {id:"3-3-1-8",pts:2,en:"Item 8. Social and Exposure History: Assesses sick contacts, daycare attendance, smoke exposure, and household crowding.",ko:"항목 8. 사회력 및 노출력: 아픈 접촉자 여부, 어린이집/보육시설 이용, 간접흡연 노출, 가정 내 밀집 거주 여부를 확인한다.",xEn:"Supports viral etiology and identifies modifiable environmental risk factors.",xKo:"바이러스성 원인을 뒷받침하고 수정 가능한 환경적 위험 요인을 확인하는 데 도움 이 된다."},
        ],
        d2:[
          {id:"3-3-2-9",pts:12,en:"Item 9. Assesses Severity of Work of Breathing: Specifically evaluates retractions (subcostal/intercostal/suprasternal), nasal flaring, grunting, head bobbing, ability to vocalize/cry, and progression over hours.",ko:"항목 9. 호흡 노력의 중증도 평가: 함몰 호흡(늑하/늑간/흉골상), 비익 확장, 신음 호흡, 머리 흔들림(head bobbing), 울거나 소리를 낼 수 있는지 여부, 수시간 동안의 악화 또 는 변화 여부를 평가한다.",xEn:"Work of breathing directly determines need for oxygen, highflow therapy, or ICU admission.",xKo:"호흡 노력의 정도는 산소 치료, 고유량 산소 요법, 또는 중환자실 입원 필요성을 결정하는 핵심 요소이다."},
          {id:"3-3-2-10",pts:10,en:"Item 10. Screens for Apnea Risk: Asks about witnessed pauses in breathing, color change, limpness, particularly in young infants or during sleep.",ko:"항목 10. 무호흡 위험 선별: 특히 어린 영아나 수면 중에 관찰된 호흡 정지, 색 변화, 축 늘어짐 여부에 대해 확인한다.",xEn:"Apnea is a serious bronchiolitis complication, especially in infants <6 months; high clinical priority.",xKo:"무호흡은 세기관지염의 심각한 합병증이며, 특히 6개월 미만 영아에서 위험이 높 아 임상적으로 매우 중요한 평가 요소이다."},
          {id:"3-3-2-11",pts:8,en:"Item 11. Evaluates Oxygenation and Clinical Deterioration: Clarifies prior cyanosis, home pulse oximeter readings (if available), worsening tachypnea, or fatigue.",ko:"항목 11. 산소화 상태 및 임상 악화 평가: 이전에 청색증이 있었는지, 가정용 산소포화 도 측정기 수치가 있었는지(있는 경우), 빈호흡 악화 여부, 피로 또는 탈진 징후를 확인 한다.",xEn:"Hypoxemia and fatigue indicate escalating respiratory failure risk.",xKo:"저산소혈증과 피로는 진행되는 호흡부전의 위험을 시사한다."},
          {id:"3-3-2-12",pts:8,en:"Item 12. Quantifies Feeding Compromise and Aspiration Risk: Assesses choking, coughing with feeds, reduced intake (<50% usual), dehydration markers, and coordination of suck–swallow–breath.",ko:"항목 12. 수유 저하 및 흡인 위험 평가: 수유 중 질식이나 기침 여부, 섭취량 감소(평소 의 50% 미만), 탈수 징후, 빨기–삼키기–호흡의 협응 상태를 확인한다.",xEn:"Poor feeding both reflects severity and increases risk of dehydration and aspiration.",xKo:"수유 저하는 질병의 중증도를 반영할 뿐 아니라 탈수와 흡인 위험을 증가시킨다."},
          {id:"3-3-2-13",pts:8,en:"Item 13. Identifies High-Risk Conditions for Severe RSV: Specifically screens for prematurity (<35 weeks), chronic lung disease, congenital heart disease, neuromuscular weakness, immunodeficiency.",ko:"항목 13. 중증 RSV 위험 요인 확인: 미숙아 출생(<35주), 만성 폐질환, 선천성 심장 질환, 신경근 약화, 면역결핍 여부를 구체적으로 확인한다.",xEn:"These factors strongly influence admission threshold and monitoring intensity.",xKo:"이러한 요인들은 입원 결정 기준과 모니터링 강도에 큰 영향을 미친다."},
          {id:"3-3-2-14",pts:6,en:"Item 14. Differentiates from Alternative Diagnoses: Screens for sudden onset (foreign body), focal pneumonia symptoms, prior recurrent wheeze (early asthma), toxic appearance (bacterial infection).",ko:"항목 14. 다른 진단과의 감별: 갑작스러운 발병(이물 흡인), 국소 폐렴 증상, 이전 반복 적인 천명(초기 천식), 중독성 외관(세균 감염)을 확인한다.",xEn:"Prevents misdiagnosis and ensures competing lifethreatening etiologies are excluded.",xKo:"오진을 예방하고 생명을 위협할 수 있는 다른 원인을 배제하기 위한 중요한 단계 이다."},
          {id:"3-3-2-15",pts:4,en:"Item 15. Assesses Hydration and Urine Output: Clarifies number of wet diapers in 24 hours and signs of dehydration.",ko:"항목 15. 수분 상태 및 소변량 평가: 지난 24시간 동안의 젖은 기저귀 수와 탈수 징후를 확인한다.",xEn:"Dehydration is a common complication and influences IV vs NG fluid decisions.",xKo:"탈수는 흔한 합병증이며, 정맥 수액 또는 비위관 수액 투여 여부 결정에 영향을 미 친다."},
          {id:"3-3-2-16",pts:4,en:"Item 16. Reviews Home Management and Response to Interventions: Asks about nasal suctioning, humidification, prior ED visits, or trial of bronchodilators and response.",ko:"항목 16. 가정 내 관리 및 처치 반응 확인: 비강 흡인, 가습 사용 여부, 이전 응급실 방 문, 기관지확장제 사용 시도 및 그 반응 여부를 확인한다.",xEn:"Understanding response to supportive care helps gauge trajectory and severity.",xKo:"지지적 치료에 대한 반응을 이해하면 질병의 경과와 중증도를 평가하는 데 도움이 된다."},
        ],
      },
      {
        id:"3-4", label_en:"Rubric 4", label_ko:"기준표 4", d1pts:40, d2pts:60,
        threshold_en:"Pass Threshold: 70/100. A score of 0 on Item 2.1 (Apnea Screen) or Item 2.2 (Hydration/Feeding) is a critical fail due to patient safety risks.",
        threshold_ko:"합격 기준: 70점. 항목 2.1 (무호흡 선별) 또는 항목 2.2 (수분/수유 상태)에서 0점을 받을 경우 환자 안전 위험으로 인해 치명적 실패(Critical Fail)로 간주됨.",
        rationale_en:"", rationale_ko:"",
        d1desc_en:"This domain evaluates the candidate's ability to structure the interview, build rapport with anxious caregivers, and gather standard medical context applicable to any pediatric admission.",
        d1desc_ko:"이 영역은 응시자의 면담 구조화 능력, 불안해하는 보호자와의 신뢰 형성 능력, 모든 소아 입원에 적용 가능한 표준 의학적 맥락 수집 능력을 평가합니다.",
        d2desc_en:"This domain evaluates the candidate's clinical reasoning for RSV bronchiolitis severity assessment.",
        d2desc_ko:"이 영역은 RSV 세기관지염 중증도 평가에 대한 응시자의 임상 추론 능력을 평가합니다.",
        d1:[
          {id:"3-4-1-1",pts:5,en:"Item 1. Introduction and Observation: Introduces self clearly to the caregivers. Simulatenously observes the infant’s position of comfort and general appearance (alert vs. lethargic) while talking to the parents.",ko:"항목 1. 소개 및 관찰: 보호자에게 자신을 명확히 소개한다. 동시에 보호자와 대화하는 동안 영아의 편안한 자세와 전반적인 상태(각성/무기력 등)를 관찰한다.",xEn:"In an infant with respiratory distress, the \"history\" begins with observation. Assessing if the child is trackable/alert while establishing rapport with the terrified parents is the foundation of the consult.",xKo:"호흡곤란이 있는 영아에서는 “병력 청취”가 관찰에서 시작된다. 보호자와 신뢰 관 계를 형성하는 동시에 아이가 시선 추적이 가능한지, 각성 상태인지 등을 평가하는 것이 진료의 기본이 된다."},
          {id:"3-4-1-2",pts:10,en:"Item 2. Chronology of Illness (HPI): Establishes the timeline of symptoms: onset of rhinorrhea (runny nose) vs. onset of respiratory distress. Specifically asks about the trajectory (is the breathing getting worse, staying the same, or improving?).",ko:"항목 2. 질병 경과의 시간적 흐름(현병력): 콧물(비루) 발생 시점과 호흡곤란 발생 시점 을 구분하여 증상의 시간적 경과를 확인한다. 특히 호흡 상태의 변화 양상(악화 중인지, 동일한지, 호전되는지)을 구체적으로 질문한다.",xEn:"Bronchiolitis typically peaks on day 3–5 of illness. Placing the patient on this timeline helps predict if they will deteriorate further or if they are in the recovery phase.",xKo:"세기관지염은 일반적으로 질병 발생 후 3–5일째에 증상이 가장 심해진다. 따라서 현재 환자가 질병 경과 중 어느 시점에 있는지를 파악하면 앞으로 악화될 가능성이 있는 지, 회복 단계에 있는지를 예측하는 데 도움이 된다."},
          {id:"3-4-1-3",pts:10,en:"Item 3. General Past Medical & Birth History: Asks about mode of delivery, complications at birth, and prior hospitalizations. — 10 points Disagree 비동의",ko:"항목 3. 전반적인 과거 병력 및 출생 병력: 분만 방식, 출생 시 합병증, 과거 입원 병력 여부를 확인한다.",xEn:"A general screen is necessary to identify unrelated but complicating factors (e.g., genetic syndromes, failure to thrive) that might lower the threshold for admission.",xKo:"전반적인 선별 질문은 입원 기준을 낮출 수 있는 관련 없는 동반 요인(예: 유전 증 후군, 성장 부진 등)을 확인하는 데 필요하다."},
          {id:"3-4-1-4",pts:10,en:"Item 4. Sick Contacts and Environmental History: Inquires about siblings (school/daycare), recent viral illnesses in the home, and specifically asks about second-hand smoke exposure.",ko:"항목 4. 아픈 접촉자 및 환경 병력: 형제자매(학교/어린이집 이용 여부), 가정 내 최근 바이러스성 질환 여부, 특히 간접흡연 노출 여부를 확인한다.",xEn:"Identifying the source (e.g., sibling with a \"cold\") supports the viral diagnosis. Smoke exposure is a proven predictor of severe bronchiolitis and increased need for respiratory support.",xKo:"감염 원인(예: 감기에 걸린 형제자매)을 확인하는 것은 바이러스성 질환 진단을 뒷 받침한다. 또한 간접흡연 노출은 세기관지염의 중증도 증가와 호흡 보조 치료 필요성 증 가와 관련된 것으로 알려져 있다."},
          {id:"3-4-1-5",pts:5,en:"Item 5. Medications and Allergies: Confirms no known drug allergies and asks about the use of home remedies or over-the-counter cough medications (which are contraindicated in this age group).",ko:"항목 5. 약물 및 알레르기 병력: 알려진 약물 알레르기가 없는지 확인하고, 가정에서 사 용한 민간요법이나 일반의약품 기침약(이 연령대에서는 금기일 수 있음) 사용 여부를 확인한다.",xEn:"Safety check to ensure no toxicity from inappropriate home medications and to clear the way for potential in-hospital pharmacotherapy.",xKo:"부적절한 가정용 약물 사용으로 인한 독성 가능성을 확인하고, 병원 내 약물 치료 를 안전하게 시행할 수 있도록 하기 위한 안전 점검이다."},
        ],
        d2:[
          {id:"3-4-2-6",pts:15,en:"Item 6. Assessment of Respiratory Failure and Apnea: Specifically asks about apnea (pauses in breathing), cyanosis (blue discoloration around lips/face), and the nature of the \"work of breathing\" (e.g., belly breathing, head bobbing).",ko:"항목 6. 호흡부전 및 무호흡 평가: 무호흡(호흡 정지), 청색증(입술/얼굴 주변의 청색 변화), 그리고 “호흡 노력”의 양상(예: 복식 호흡, 머리 흔들림)을 구체적으로 확인한다.",xEn:"Apnea is the most dangerous complication of RSV in infants under 6 months or former preemies. Missing a history of \"pauses in breathing\" is a critical safety failure.",xKo:"무호흡은 특히 6개월 미만 영아나 미숙아 출생 영아에서 RSV의 가장 위험한 합병 증이다. “호흡이 멈추는 것처럼 보였다”는 병력을 놓치는 것은 중대한 환자 안전 문제입니다."},
          {id:"3-4-2-7",pts:15,en:"Item 7. Hydration and Feeding Mechanics (\"The Work of Feeding\"): Quantifies wet diapers (output) and specific intake volume. Crucially, asks how the baby is feeding: \"Does he have to stop sucking to breathe?\" or \"Is he sweating/tiring during feeds?\"",ko:"항목 7. 수분 상태 및 수유 역학 평가(“수유 시 호흡 부담”): 젖은 기저귀 수(배설량)와 실제 섭취량을 정량적으로 확인한다. 특히 “아기가 숨을 쉬기 위해 빨기를 멈춰야 하나 요?” 또는 “수유 중에 땀을 흘리거나 쉽게 지치나요?”와 같이 수유 양상을 구체적으로 질문한다.",xEn:"In infants, feeding is their exercise stress test. Inability to coordinate suck-swallow-breathe due to tachypnea is the primary indication for admission for IV fluids/NG tube, often before hypoxia sets in. The vignette notes \"decreased intake\" and \"one wet diaper,\" making this a pivotal severity marker.",xKo:"영아에게 수유는 일종의 운동 부하 검사와 같다. 빈호흡으로 인해 빨기-삼키기-호흡의 협응이 어려워지는 경우는 저산소증이 나타나기 전이라도 정맥 수액 또는 비위관 수액을 위해 입원을 결정하는 주요 기준이 된다. 이사례에서 “섭취량 감소”와 “젖은 기 저귀 한 번”이 언급된 점을 고려할 때, 이는 중증도를 판단하는 핵심 지표이다."},
          {id:"3-4-2-8",pts:10,en:"Item 8. Risk Stratification (Prematurity and Cardiac Disease): Explicitly asks about gestational age at birth (prematurity) and history of congenital heart disease or chronic lung disease of prematurity.",ko:"항목 8. 위험도 평가(미숙아 및 심장 질환): 출생 시 재태 연령(미숙아 여부)과 선천성 심장 질환 또는 미숙아 관련 만성 폐질환 병력을 명확히 확인한다.",xEn:"\"Unremarkable PMH\" in the vignette needs to be actively confirmed. A 34-weeker or a baby with a small VSD handles RSV much more poorly than a full-term infant. This dictates the aggressiveness of monitoring.",xKo:"증례에서 “특이 과거력 없음”이라고 되어 있어도 이를 반드시 직접 확인해야 한 다. 예를 들어 34주 미숙아나 작은 심실중격결손(VSD)이 있는 영아는 만삭 영아보다 RSV 감염을 훨씬 더 심하게 겪을 수 있다. 이러한 정보는 모니터링과 치료의 적극성을 결정하는 데 중요한 요소이다."},
          {id:"3-4-2-9",pts:10,en:"Item 9. Differential Diagnosis Exclusion (Aspiration/Foreign Body): Asks about the onset of symptoms (sudden vs. gradual) and specifically asks about choking episodes prior to the start of distress.",ko:"항목 9. 감별 진단 배제(흡인/이물 흡인): 증상의 시작 양상(갑작스러운지 또는 점진적 인지)을 확인하고, 호흡곤란이 시작되기 전에 질식 에피소드가 있었는지 구체적으로 질 문한다.",xEn:"An 8-month-old is at the oral-exploration stage. A foreign body aspiration can mimic bronchiolitis (wheezing/distress). The clinician must ensure the distress wasn't precipitated by a choking event (e.g., a toy or food) to avoid missing a surgical emergency.",xKo:"8개월 영아는 구강 탐색 단계에 있어 이물 흡인의 위험이 높다. 이물 흡인은 천명 이나 호흡곤란 등 세기관지염과 유사한 증상을 보일 수 있다. 따라서 장난감이나 음식 등으로 인한 질식 사건이 호흡곤란의 원인이었는지 확인하여 수술적 응급 상황을 놓치 지 않도록 해야 한다."},
          {id:"3-4-2-10",pts:10,en:"Item 10. History of Atopy/Wheezing: Asks about personal history of eczema or family history of asthma/atopy. Asks if the child has wheezed before this episode.",ko:"항목 10. 아토피/천명 병력 확인: 개인의 습진 병력이나 가족의 천식/아토피 병력을 확인하고, 이번 에피소드 이전에 천명이 있었는지 질문한다.",xEn:"While this is likely primary bronchiolitis, a strong family history of asthma or prior wheezing episodes suggests \"Viral Induced Wheeze\" or early asthma, which might respond to bronchodilators (Ventolin), whereas classic bronchiolitis generally does not. This guides the trial of therapy.",xKo:"이사례는 일차성 세기관지염일 가능성이 높지만, 강한 가족력의 천식이나 이전 천명 에피소드가 있다면 “바이러스 유발 천명(Viral Induced Wheeze)” 또는 초기 천 식 가능성을 시사할 수 있다. 이러한 경우 기관지확장제(예: Ventolin)에 반응할 수 있 지만, 전형적인 세기관지염은 일반적으로 그렇지 않다. 따라서 치료 시도 여부와 방향을 결정하는 데 중요한 정보가 된다."},
        ],
      },
    ],
  },
  {
    id: 4,
    en: "Case 4: Toddler with a brief generalized seizure during high fever — simple febrile seizure",
    ko: "사례 4: 고열 중 짧은 전신 발작을 보인 유아 — 단순 열성 경련",
    vignette: {
      rows: [
        { en:"Chief Complaint", ko:"주 호소", val_en:"Seizure associated with fever", val_ko:"발열과 동반된 발작" },
        { en:"History of Presenting Illness", ko:"현병력", val_en:"18-month-old boy developed a generalized tonic-clonic seizure lasting approximately 3 minutes at home, followed by 15 minutes of postictal sleepiness with full recovery upon ED arrival. Fever for 12 hours with rhinorrhea and sore throat; no prior seizures; no focal deficits post-event. No vomiting/diarrhea; no known ingestions or trauma.", val_ko:"18개월 남아가 집에서 약 3분간 지속된 전신 강직-간대성 발작을 보였으며, 이후 약 15분간 발작 후 기면 상태를 보인 뒤 응급실 도착 시 완전히 회복됨. 12시간 전부터 발열이 있었고 콧물과 인후통 동반. 이전 발작 병력 없음. 발작 이후 국소 신경학적 이상 없음. 구토나 설사 없음. 약물 섭취나 외상 의심 병력 없음." },
        { en:"Past Medical History", ko:"과거 병력", val_en:"Healthy; normal development; no history of neurologic disease.", val_ko:"건강한 아동; 정상 발달; 신경계 질환 병력 없음." },
        { en:"Medications", ko:"복용 약물", val_en:"None.", val_ko:"없음." },
        { en:"Allergies", ko:"알레르기", val_en:"No known drug allergies.", val_ko:"알려진 약물 알레르기 없음." },
        { en:"Family/Social History", ko:"사회력/가족력", val_en:"No family history of epilepsy; attends daycare.", val_ko:"간질 가족력 없음; 어린이집 이용 중." },
        { en:"Immunizations", ko:"예방접종", val_en:"Up-to-date.", val_ko:"연령에 맞게 접종 완료." },
        { en:"Review of Systems", ko:"계통별 문진", val_en:"Positive for fever, rhinorrhea, sore throat; negative for rash, dysuria, focal weakness, persistent vomiting.", val_ko:"발열, 콧물, 인후통 있음. 발진, 배뇨통, 국소 근력 저하, 지속적 구토 없음." },
      ],
      vitals: [
        { en:"Age", ko:"연령", val_en:"18 months", val_ko:"18개월" },
        { en:"Temperature", ko:"체온", val_en:"39.4°C (36.5–37.5°C) — febrile", val_ko:"39.4°C (36.5–37.5°C) — 발열" },
        { en:"Heart Rate", ko:"심박수", val_en:"170 bpm (90–150 bpm) — tachycardic with fever", val_ko:"170 bpm (90–150 bpm) — 발열에 동반된 빈맥" },
        { en:"Respiratory Rate", ko:"호흡수", val_en:"32 breaths/min (24–30 breaths/min)", val_ko:"32회/분 (24–30회/분)" },
        { en:"Blood Pressure", ko:"혈압", val_en:"90/50 mmHg (85–105/50–65 mmHg)", val_ko:"90/50 mmHg (85–105/50–65 mmHg)" },
        { en:"SpO₂", ko:"SpO₂", val_en:"99% on room air (≥95%)", val_ko:"99% 실내 공기 (≥95%)" },
      ],
      exam: [
        { en:"General", ko:"전반", val_en:"Alert, consolable; no distress after recovery", val_ko:"각성 상태, 달래면 진정됨; 회복 후 호흡곤란 없음" },
        { en:"Neuro", ko:"신경계", val_en:"Nonfocal exam; normal tone and strength; no meningeal signs; normal gait for age", val_ko:"국소 신경학적 이상 없음; 정상 근긴장도와 근력; 수막 자극 징후 없음; 연령에 맞는 보행" },
        { en:"HEENT", ko:"HEENT", val_en:"Mildly erythematous pharynx without exudates; TMs mildly injected; nasal discharge present", val_ko:"인두 약간 발적, 삼출 없음; 고막 약간 충혈; 비루 있음" },
        { en:"Cardiovascular", ko:"심혈관", val_en:"Tachycardic; regular rhythm; good perfusion", val_ko:"빈맥; 규칙적 리듬; 말초 관류 양호" },
        { en:"Respiratory", ko:"호흡기", val_en:"Clear to auscultation; no retractions/wheeze", val_ko:"청진 시 깨끗함; 함몰 호흡이나 천명 없음" },
        { en:"Skin", ko:"피부", val_en:"No petechiae or purpura", val_ko:"점상출혈이나 자반 없음" },
      ],
    },
    rubrics: [
      {
        id:"4-1", label_en:"Rubric 1", label_ko:"기준표 1", d1pts:50, d2pts:50,
        threshold_en:"", threshold_ko:"",
        rationale_en:"", rationale_ko:"",
        d1desc_en:"This domain evaluates core history-taking skills applicable across all pediatric emergency presentations.",
        d1desc_ko:"이 영역은 모든 소아 응급 상황에 적용 가능한 핵심 병력 청취 기술을 평가합니다.",
        d2desc_en:"This domain evaluates case-specific diagnostic history for simple febrile seizure.",
        d2desc_ko:"이 영역은 단순 열성 경련에 대한 사례 특이적 진단 병력을 평가합니다.",
        d1:[
          {id:"4-1-1-1",pts:5,en:"Item 1. Chief Complaint: Clearly elicits and articulates the primary presenting problem(s) in patient's/family's own words.",ko:"항목 1. 주 호소: 환자/보호자의 표현 그대로 주요 호소 문제를 명확히 확인하고 기술합니다.",xEn:"Establishes encounter focus; foundational and routinely expected, modest weight.",xKo:"진료의 초점을 설정하는 기본 단계로, 모든 병력 청취의 기초가 되는 항목이다. 일 반적으로 항상 수행되는 요소이므로 비교적 낮은 가중치를 부여하였다."},
          {id:"4-1-1-2",pts:12,en:"Item 2. History of Presenting Illness: Systematically explores onset, timing, duration, severity, progression, aggravating/alleviating factors, and associated symptoms using a structured approach (e.g., OPQRST).",ko:"항목 2. 현병력: 발병 시점, 시간 경과, 지속 기간, 중증도, 진행 양상, 악화/완화 요인, 동반 증상을 구조화된 접근법(예: OPQRST)을 사용하여 체계적으로 탐색한다.",xEn:"Captures illness trajectory for urgency in pediatric EM; core to all differentials, highest general weight.",xKo:"소아 응급의학에서 질환의 경과와 긴급성을 파악하는 핵심 요소이며, 모든 감별 진단의 중심이 되는 정보이다. 일반 병력 항목 중 가장 높은 가중치를 부여하였다."},
          {id:"4-1-1-3",pts:7,en:"Item 3. Past Medical History: Inquiries about chronic illnesses, prior hospitalizations, surgeries, birth/developmental history, and previous similar episodes.",ko:"항목 3. 과거 병력: 만성 질환, 이전 입원 및 수술, 출생 및 발달 병력, 이전에 유사한 증상이 있었는지 여부를 확인한다.",xEn:"Identifies risks or patterns affecting management; moderate for baseline stratification.",xKo:"치료 계획에 영향을 줄 수 있는 위험 요인이나 질환 패턴을 파악하는 데 중요하며, 기본적인 위험도 평가를 위해 중간 수준의 가중치를 부여하였다."},
          {id:"4-1-1-4",pts:4,en:"Item 4. Medications: Documents current prescriptions, over-the-counter drugs, recent antibiotics, and adherence.",ko:"항목 4. 복용 약물: 현재 처방약, 일반의약품, 최근 항생제 사용 여부, 복약 순응도를 확인한다.",xEn:"Guides therapy and avoids interactions; straightforward, low weight.",xKo:"치료 계획 수립과 약물 상호작용 예방에 도움을 주는 기본적인 항목으로, 비교적 단순한 정보이므로 낮은 가중치를 부여하였다."},
          {id:"4-1-1-5",pts:4,en:"Item 5. Allergies: Asks about drug/food allergies, adverse reactions, and anaphylaxis history.",ko:"항목 5. 알레르기: 약물 또는 음식 알레르기, 이상 반응, 아나필락시스 병력을 확인한다.",xEn:"Ensures prescribing safety; low weight paired with medications.",xKo:"처방의 안전성을 보장하기 위한 필수 확인 사항이며, 복용 약물 항목과 함께 낮은 가중치를 부여하였다."},
          {id:"4-1-1-6",pts:4,en:"Item 6. Immunizations: Confirms status, recent vaccines, and gaps relevant to infectious risks.",ko:"항목 6. 예방접종: 예방접종 상태, 최근 접종 여부, 감염 위험과 관련된 미접종 여부를 확인한다.",xEn:"Critical in pediatrics for context; low as often documented.",xKo:"소아 진료에서 중요한 배경 정보이지만, 대부분 이미 기록되어 있는 경우가 많아 낮은 가중치를 부여하였다."},
          {id:"4-1-1-7",pts:5,en:"Item 7. Family History: Explores hereditary conditions and relevant familial illnesses.",ko:"항목 7. 가족력: 유전 질환 및 관련 있는 가족 내 질환 여부를 확인한다. — 5점 비동의",xEn:"Uncovers genetic risks; pediatric-relevant, moderate weight.",xKo:"유전적 위험 요인을 파악하는 데 중요하며, 소아 환자에서 특히 의미가 있어 중간 수준의 가중치를 부여하였다."},
          {id:"4-1-1-8",pts:4,en:"Item 8. Social History: Assesses home environment, caregivers, school/daycare/nursery exposure, and habits.",ko:"항목 8. 사회력: 가정 환경, 보호자, 학교/어린이집/보육시설 노출, 생활 습관 등을 확인 한다.",xEn:"Contextualizes adherence/exposures; supportive, low weight.",xKo:"치료 순응도와 감염 노출 등의 맥락을 이해하는 데 도움이 되는 보조적 정보이므 로 낮은 가중치를 부여하였다."},
          {id:"4-1-1-9",pts:5,en:"Item 9. Review of Systems: Performs age-appropriate screening for unrelated symptoms.",ko:"항목 9. 계통별 문진: 연령에 맞게 관련 없는 증상에 대해서도 선별적으로 확인한다.",xEn:"Safety net for comorbidities; moderate for comprehensiveness.",xKo:"동반 질환이나 다른 문제를 놓치지 않기 위한 안전망 역할을 하며, 전반적인 평가 의 완전성을 위해 중간 수준의 가중치를 부여하였다."},
        ],
        d2:[
          {id:"4-1-2-10",pts:15,en:"Item 10. Seizure Characterization: Details semiology (type, focal/generalized), duration, postictal state, witnesses, and recovery pattern.",ko:"항목 10. 발작 양상 평가: 발작 형태(국소/전신), 지속 시간, 발작 후 상태(postictal state), 목격자 여부, 회복 양상을 상세히 확인한다.",xEn:"Essential to classify simple vs. complex febrile seizure; highest weight for immediate risk stratification and LP/neuroimaging decisions.",xKo:"단순 열성 경련과 복합 열성 경련을 구분하는 데 필수적인 정보이며, 즉각적인 위험도 평가와 요추천자 또는 신경영상 검사 필요 여부를 결정하는 데 핵심적인 요소이므 로 가장 높은 가중치를 부여하였다."},
          {id:"4-1-2-11",pts:12,en:"Item 11. Fever and Prodrome: Probes fever onset/pattern relative to seizure, height, associated infection symptoms (e.g., URI, otitis).",ko:"항목 11. 발열 및 전구 증상: 발작과 관련된 발열의 시작 시점과 양상, 최고 체온, 동반 감염 증상(예: 상기도 감염, 중이염 등)을 확인한다.",xEn:"Confirms benign febrile etiology vs. CNS infection; high weight central to diagnosis.",xKo:"양성 열성 경련인지 중추신경계 감염인지 감별하는 데 핵심적인 정보로, 진단에 직접적인 영향을 미치므로 높은 가중치를 부여하였다."},
          {id:"4-1-2-12",pts:10,en:"Item 12. Red Flag Screening: Explores prolonged (>15 min)/recurrent seizures, focal features, lethargy, meningeal signs, or vomiting.",ko:"항목 12. 위험 신호 선별: 장시간 발작(>15분), 반복 발작, 국소 신경학적 특징, 무기 력, 수막 자극 징후, 구토 여부를 확인한다.",xEn:"Rules out serious mimics (meningitis, abscess); substantial for workup thresholds.",xKo:"수막염, 뇌농양 등 심각한 질환과의 감별을 위해 필요한 평가로, 추가 검사 시행 기준을 결정하는 데 중요한 요소이므로 비교적 높은 가중치를 부여하였다."},
          {id:"4-1-2-13",pts:6,en:"Item 13. Family Seizure History: Inquires about familial febrile seizures, epilepsy, or fever-triggered events.",ko:"항목 13. 가족 발작 병력: 가족 중 열성 경련, 간질, 발열과 연관된 발작 병력이 있는지 확인한다.",xEn:"Predicts recurrence risk; moderate genetic modifier.",xKo:"열성 경련의 재발 위험을 예측하는 데 도움이 되는 유전적 요인으로, 중간 수준의 가중치를 부여하였다."},
          {id:"4-1-2-14",pts:4,en:"Item 14. Trigger and Exclusion History: Assesses ingestions, trauma, recent immunizations, fasting, or metabolic stressors.",ko:"항목 14. 유발 요인 및 배제 병력: 약물 또는 독성 물질 섭취, 외상, 최근 예방접종, 금 식, 대사적 스트레스 요인 여부를 확인한다.",xEn:"Excludes provoked non-febrile causes; supportive for reassurance.",xKo:"발열 외 다른 유발 요인에 의한 발작 가능성을 배제하고, 열성 경련 진단을 뒷받침 하기 위한 보조적 평가이다."},
          {id:"4-1-2-15",pts:3,en:"Item 15. Baseline Neuro/Developmental History: Screens prior seizures, milestones, headaches, or behavioral changes.",ko:"항목 15. 기저 신경 및 발달 병력: 이전 발작 여부, 발달 이정표, 두통, 행동 변화 등을 확인한다.",xEn:"Establishes neuro norm; lower weight as confirmatory in well child.",xKo:"아동의 신경학적 기저 상태를 파악하기 위한 항목으로, 건강한 아동에서는 보조적 인 확인 요소이므로 낮은 가중치를 부여하였다."},
        ],
      },
      {
        id:"4-2", label_en:"Rubric 2", label_ko:"기준표 2", d1pts:35, d2pts:65,
        threshold_en:"", threshold_ko:"",
        rationale_en:"Design Rationale for Domain Weighting: Domain 2 receives the heaviest weighting (65/35) because the clinical encounter for a febrile seizure is almost entirely history-dependent. The diagnosis is made retrospectively from the witness account, the classification (simple vs. complex) determines investigation and follow-up, and the exclusion of dangerous mimics (meningitis, ingestion, epilepsy) relies predominantly on targeted questioning.",
        rationale_ko:"영역 가중치 설계 근거: 이 기준표에서는 열성 경련의 임상 평가가 거의 전적으로 병력에 의존하기 때문에 영역 2에 가장 높은 가중치(65/35)를 부여하였다. 진단은 목격자의 진술을 바탕으로 사후적으로 이루어지며, 단순 열성 경련과 복합 열성 경련의 구분은 검사 및 추적 관찰 계획을 결정한다.",
        d1desc_en:"This domain evaluates the candidate's ability to conduct a comprehensive general clinical history, adapted to a toddler presenting with a seizure and fever.",
        d1desc_ko:"이 영역은 발작과 발열을 보이는 유아에 맞게 조정된, 포괄적인 일반 임상 병력을 청취하는 능력을 평가합니다.",
        d2desc_en:"This domain evaluates case-specific diagnostic reasoning for simple febrile seizure classification and exclusion of dangerous mimics (65 points).",
        d2desc_ko:"이 영역은 단순 열성 경련 분류 및 위험한 유사 질환 배제에 대한 사례 특이적 진단 추론을 평가합니다 (65점).",
        d1:[
          {id:"4-2-1-1",pts:7,en:"Item 1. Presenting Complaint Characterization: Exploration of the two core presenting features — the seizure event and the febrile illness — including onset, timeline, and the relationship between them.",ko:"항목 1. 주 호소 특징 평가: 두 가지 핵심 증상인 발작 사건과 발열성 질환에 대해 발병 시점, 시간적 경과, 두 증상 간의 관계를 탐색한다.",xEn:"Establishing the temporal link between fever onset and seizure occurrence is foundational. The clinician must construct a clear narrative: how long the child was febrile before the seizure, what the parents observed, and what the child's status is now. This anchors all subsequent reasoning and receives high weighting as the entry point into the clinical encounter.",xKo:"발열 시작과 발작 발생 사이의 시간적 연관성을 확인하는 것이 기본적이다. 임상 의는 발작 전 아이가 얼마나 오래 발열 상태였는지, 보호자가 무엇을 관찰했는지, 현재 아이의 상태가 어떤지를 포함한 명확한 임상 서사를 구성해야 한다. 이는 이후 모든 임상적 추론의 기반이 되므로 비교적 높은 가중치를 부여하였다."},
          {id:"4-2-1-2",pts:5,en:"Item 2. Past Medical History: Prior seizures, prior febrile illnesses without seizures, neonatal history, neurological conditions, hospitalizations, and chronic illnesses.",ko:"항목 2. 과거 병력: 이전 발작 병력, 발작 없이 발생했던 과거 발열 질환, 신생아기 병력, 신경계 질환, 과거 입원, 만성 질환 여부를 확인한다.",xEn:"A history of prior unprovoked seizures or neonatal seizures fundamentally reclassifies this presentation away from simple febrile seizure toward epilepsy with febrile provocation. Prior febrile illnesses without seizures provide useful context about threshold. Any history of neurodevelopmental abnormality raises the complexity of the assessment and follow-up plan. Disagree 비동의",xKo:"이전에 비유발 발작이나 신생아기 발작 병력이 있다면 이번 사건은 단순 열성 경 련이 아니라 발열에 의해 유발된 간질로 재분류될 수 있다. 발작 없이 지나간 과거 발열 질환은 발작 역치에 대한 맥락을 제공한다. 또한 신경발달 이상 병력이 있다면 평가의 복잡성과 추적 관리 계획에 영향을 미친다."},
          {id:"4-2-1-3",pts:5,en:"Item 3. Birth and Developmental History: Gestational age, perinatal complications (hypoxic-ischemic encephalopathy, neonatal infections), and detailed developmental milestone attainment — gross/fine motor, language, and social milestones.",ko:"항목 3. 출생 및 발달 병력: 재태 연령, 주산기 합병증(저산소성 허혈성 뇌병증, 신생아 감염 등), 그리고 대근육/소근육 운동, 언어, 사회성 발달 이정표 달성 여부를 상세히 확인한다.",xEn:"This receives elevated weighting compared to many other presentations because developmental status is a key criterion for distinguishing simple febrile seizures (which occur in otherwise normal children) from seizures occurring in the context of underlying neurological vulnerability. Perinatal complications such as HIE predispose to epilepsy. A child not meeting milestones warrants a different level of investigation and follow-up.",xKo:"이 항목은 다른 많은 임상 상황보다 더 높은 중요도를 가진다. 발달 상태는 단순 열성 경련(대체로 정상 발달 아동에서 발생)과 기저 신경학적 취약성이 있는 아동의 발작을 구분하는 핵심 기준이기 때문이다. 저산소성 허혈성 뇌병증(HIE)과 같은 주산기 합병증은 간질 발생 위험을 높인다. 발달 이정표를 달성하지 못한 아동은 검사와 추적 관찰 수준이 달라져야 한다."},
          {id:"4-2-1-4",pts:4,en:"Item 4. Medication, Ingestion, and Allergy History: Current medications, any antipyretics given (timing, dose, response), possibility of accidental ingestion of household medications or toxins, and drug allergies.",ko:"항목 4. 약물, 섭취, 및 알레르기 병력: 현재 복용 중인 약물, 해열제 사용 여부(투여 시 점, 용량, 반응), 가정 내 약물이나 독성 물질의 우발적 섭취 가능성, 약물 알레르기를 확인한다.",xEn:"Accidental ingestion is a critical differential for seizure in a toddler and must be actively excluded through history. Antipyretic use — what was given, when, and whether fever responded — informs fever management counseling. Allergy documentation is a standard safety requirement. Moderate weighting reflects that this case does not suggest ingestion but the question must always be asked.",xKo:"유아에서 발작의 중요한 감별 진단 중 하나가 우발적 독성 물질 섭취이므로 병력 으로 반드시 배제해야 한다. 어떤 해열제를 언제 투여했고 열이 어떻게 반응했는지 확인 하는 것은 이후 발열 관리 교육에도 도움이 된다. 알레르기 확인은 기본적인 환자 안전 절차이다. 이사례에서 섭취 가능성이 높지는 않지만 반드시 확인해야 하므로 중간 수준 의 가중치를 부여하였다."},
          {id:"4-2-1-5",pts:4,en:"Item 5. Immunization History: Confirmation of up-to-date vaccinations, with attention to recent immunizations in the preceding 1–2 weeks.",ko:"항목 5. 예방접종 병력: 예방접종이 연령에 맞게 완료되었는지 확인하고, 특히 최근 1– 2주 이내에 접종한 백신이 있는지 확인한다.",xEn:"This receives higher-than-usual weighting for two reasons. First, certain vaccinations (particularly MMR at 12–15 months and DTaP) are associated with post-immunization febrile seizures, and a recent vaccination may identify the fever source. Second, immunization status informs the pre-test probability of bacterial meningitis — an incompletely immunized child with fever and seizure warrants a much lower threshold for lumbar puncture. This is both a general and case-specific consideration.",xKo:"이 항목은 두 가지 이유로 일반적인 경우보다 더 높은 가중치를 가진다. 첫째, 특 정 백신(특히 생후 12–15개월에 접종하는 MMR과 DTaP)은 접종 후 열성 경련과 연관 될 수 있으며, 최근 예방접종 여부는 발열의 원인을 파악하는 데 도움이 될 수 있다. 둘 째, 예방접종 상태는 세균성 수막염의 사전 확률을 평가하는 데 중요한 요소이다. 예방 접종이 불완전한 아동에서 발열과 발작이 동반된 경우 요추천자 시행 기준이 훨씬 낮아 진다. 이는 일반 병력 요소이면서 동시에 사례 특이적 판단에 직접적인 영향을 미친다."},
          {id:"4-2-1-6",pts:4,en:"Item 6. Social and Family History: Household safety (access to medications, toxins), supervision context at the time of the seizure, family history of febrile seizures and epilepsy, and ability to recognize and respond to recurrence.",ko:"항목 6. 사회력 및 가족력: 가정 내 안전 환경(약물·독성 물질 접근 가능성), 발작 당시 의 보호 및 감독 상황, 열성 경련 및 간질의 가족력, 발작 재발 시 보호자의 인지 및 대응 능력을 확인한다.",xEn:"Family history of febrile seizures is directly relevant to recurrence risk counseling. Understanding the supervision context helps assess ingestion risk and ensures accurate witness reporting. Parental health literacy and ability to manage a recurrent seizure at home is critical for safe discharge planning. Moderate weighting reflects combined diagnostic and disposition importance.",xKo:"열성 경련의 가족력은 재발 위험 상담에 직접적으로 관련된다. 발작 당시의 감독 상황을 파악하면 독성 물질 섭취 가능성을 평가하고 목격자의 진술 신뢰도를 판단하는 데 도움이 된다. 또한 보호자의 건강 이해도와 가정에서 발작이 재발했을 때 대처할 수 있는 능력은 안전한 퇴원 계획 수립에 중요하다. 이러한 진단적·처치적 중요성을 반영하 여 중간 수준의 가중치를 부여하였다."},
          {id:"4-2-1-7",pts:3,en:"Item 7. Review of Systems: Screening beyond the presenting complaint — rash, GI symptoms, urinary symptoms, ear pulling, irritability patterns, and joint or limb complaints.",ko:"항목 7. 계통별 문진: 주 호소 외에 발진, 위장관 증상, 배뇨 증상, 귀를 잡아당기는 행동, 보채는 양상, 관절 또는 사지 통증 등을 선별적으로 확인한다.",xEn:"The review of systems serves to identify the fever source (otitis media, pharyngitis, UTI, viral exanthem) and to screen for features suggesting more serious pathology (petechial rash, persistent vomiting, neck stiffness, photophobia). In a post-seizure child, broad screening helps avoid anchoring on the seizure while missing the underlying infection or an alternative diagnosis.",xKo:"계통별 문진은 발열의 원인(중이염, 인두염, 요로감염, 바이러스 발진 등)을 파악 하고 더 심각한 질환을 시사하는 증상(점상 발진, 지속적인 구토, 경부 강직, 광과민 등) 을 확인하는 데 도움을 준다. 발작 이후의 아동에서는 발작 자체에만 집중하여 기저 감염이나 다른 진단을 놓치지 않도록 광범위한 선별 질문이 중요하다."},
          {id:"4-2-1-8",pts:3,en:"Item 8. Structured and Organized Approach: History obtained logically, with appropriate prioritization of seizure characterization and neurological safety before completing the general history.",ko:"항목 8. 구조화되고 체계적인 접근: 병력을 논리적으로 수집하며, 일반 병력을 마무리 하기 전에 발작의 특징과 신경학적 안전성 평가를 우선적으로 확인한다.",xEn:"In a post-seizure child, the clinician must rapidly establish that the child has returned to neurological baseline before proceeding with a systematic history. Excellent trainees prioritize: seizure character → current neurological status → exclusion of meningism → then systematic history. This process marker evaluates emergency-appropriate sequencing.",xKo:"발작 이후 아동에서는 먼저 아이가 신경학적 기저 상태로 회복되었는지를 신속히 확인해야 한다. 우수한 수련의는 다음과 같은 우선순위를 따른다: 발작 양상 확인 → 현재 신경학적 상태 평가 → 수막 자극 징후 배제 → 이후 체계적인 병력 청취 진행. 이 항 목은 응급 상황에 적절한 평가 순서를 따르는지를 평가하는 과정 지표이다."},
        ],
        d2:[
          {id:"4-2-2-9",pts:14,en:"Item 9. Detailed Seizure Semiology: Comprehensive witness account including — what the child was doing immediately before the seizure, initial body part involved (generalized vs. focal onset), type of movements (tonic, clonic, tonic-clonic), eye deviation and direction, symmetry of movements, cyanosis, incontinence, breathing pattern during the event, and child's responsiveness during the seizure.",ko:"항목 9. 발작 반응 양상(semiology) 상세 평가: 목격자의 진술을 바탕으로 다음 사항 을 포괄적으로 확인한다 — 발작 직전에 아이가 무엇을 하고 있었는지, 처음 움직이기 시작한 신체 부위(전신 vs 국소 시작), 움직임의 유형(강직, 간대, 강직-간대), 안구 편위 및 방향, 움직임의 대칭성, 청색증 여부, 요실금 여부, 발작 중 호흡 양상, 발작 중 아이의 반응성.",xEn:"This is the single most critical line of questioning. The distinction between simple and complex febrile seizure — and between febrile seizure and other seizure types — rests almost entirely on the witness description of the event. Focal onset (one limb, eye deviation to one side, asymmetric movements) reclassifies the event as complex and mandates different investigation and follow-up. Since the clinician was not present for the event, the quality of this retrospective history determines diagnostic accuracy. This receives the highest individual weighting in the entire rubric.",xKo:"이사례에서 가장 중요한 문진 항목이다. 단순 열성 경련과 복합 열성 경련을 구분 하고, 열성 경련과 다른 유형의 발작을 구별하는 것은 거의 전적으로 목격자의 사건 설 명에 의존한다. 국소 시작(한쪽 사지, 한쪽 방향으로의 안구 편위, 비대칭적 움직임)은 사건을 복합 열성 경련으로 재분류하며, 이는 검사 및 추적 관찰 계획을 달라지게 한다. 임상의가 사건을 직접 목격하지 않았기 때문에, 이러한 사후 병력의 질이 진단 정확도를 결정한다. 따라서 전체 기준표에서 가장 높은 개별 가중치를 부여하였다."},
          {id:"4-2-2-10",pts:10,en:"Item 10. Seizure Duration and Termination: How long the seizure lasted (caregiver's estimate and method of timing), whether it stopped spontaneously, whether any intervention was required (repositioning, emergency services called), and whether there were multiple discrete episodes versus one continuous event.",ko:"항목 10. 발작 지속 시간 및 종료 양상: 발작이 얼마나 지속되었는지(보호자의 추정과 시간 측정 방식), 자연적으로 멈췄는지 여부, 어떤 개입이 필요했는지(자세 변경, 응급 서비스 호출 등), 하나의 연속된 사건이었는지 또는 여러 번의 개별 발작이 있었는지를 확인한다.",xEn:"Duration is a defining criterion for simple versus complex febrile seizure. A seizure lasting >15 minutes meets criteria for febrile status epilepticus, which carries different management, investigation, and prognostic implications. Multiple seizures within 24 hours also reclassify the event as complex. Caregivers often overestimate duration, so the clinician should probe how timing was assessed (watched a clock, felt like a long time, called emergency services and they arrived during the event). Very high weighting reflects its direct classification impact.",xKo:"발작 지속 시간은 단순 열성 경련과 복합 열성 경련을 구분하는 핵심 기준이다. 15분 이상 지속되는 발작은 열성 간질 지속 상태(febrile status epilepticus)에 해당 하며, 이는 치료, 검사, 예후 평가에 다른 접근이 필요하다. 또한 24시간 내에 여러 번의 발작이 발생한 경우에도 사건은 복합 열성 경련으로 재분류된다. 보호자는 발작 지속 시 간을 과대평가하는 경우가 많기 때문에, 실제로 시간을 어떻게 측정했는지(시계를 보았 는지, 체감상 오래 느껴졌는지, 발작 중 응급 서비스를 호출했고 도착 시점이 언제였는 지 등)를 구체적으로 확인해야 한다. 이러한 요소가 발작 분류에 직접적인 영향을 미치 므로 높은 가중치를 부여하였다."},
          {id:"4-2-2-11",pts:8,en:"Item 11. Postictal Period Characterization: Duration of postictal drowsiness or unresponsiveness, timeline to full recovery, whether the child returned completely to baseline behavior and interaction, and any focal weakness or asymmetry noted during recovery (Todd's paralysis).",ko:"항목 11. 발작 후 상태(postictal period) 평가: 발작 후 졸림이나 반응 저하의 지속 시간, 완전한 회복까지의 시간, 아이가 평소 행동과 상호작용 수준으로 완전히 돌아왔는 지 여부, 회복 과정에서 국소 근력 저하나 비대칭이 있었는지(Todd 마비)를 확인한다.",xEn:"Prolonged postictal state (>30 minutes) or focal postictal deficits (Todd's paralysis) are red flags for complex febrile seizure or an underlying structural/epileptic etiology. The parents' report that the child was sleepy for 15 minutes with full recovery is reassuring, but the clinician must explicitly ask about asymmetric weakness, abnormal eye movements, or behavioral changes during recovery. High weighting reflects its role in distinguishing benign from concerning events.",xKo:"발작 후 상태가 30분 이상 지속되거나 국소 신경학적 결손(Todd 마비)이 나타나 는 경우는 복합 열성 경련 또는 기저 구조적/간질성 원인을 시사하는 위험 신호이다. 이사례에서처럼 “약 15분간 졸림 후 완전히 회복”되었다는 보고는 안심되는 소견이지만, 임상의는 회복 과정에서 한쪽 팔다리 약화, 비정상적인 안구 움직임, 행동 변화가 있었 는지 반드시 구체적으로 질문해야 한다. 이러한 정보는 양성 사건과 우려되는 사건을 구 분하는 데 중요한 역할을 하므로 높은 가중치를 부여하였다."},
          {id:"4-2-2-12",pts:7,en:"Item 12. Fever and Seizure Temporal Relationship: Whether the seizure occurred during a rapid rise in temperature, whether the parents were aware of fever before the seizure or discovered it afterward, peak temperature recorded, and any antipyretics given before the event.",ko:"항목 12. 발열과 발작의 시간적 관계: 발작이 체온이 급격히 상승하는 시점에 발생했는 지, 부모가 발작 전에 이미 발열을 인지했는지 또는 발작 이후에 발견했는지, 기록된 최 고 체온, 사건 이전에 해열제가 투여되었는지 여부를 확인한다.",xEn:"Simple febrile seizures classically occur during rapid temperature rise, often as the first sign of fever. A seizure occurring after prolonged fever that has been present for days is less typical and may warrant closer scrutiny. Understanding whether antipyretics had been given and whether fever was being managed informs both the acute assessment and the discharge counseling. This directly contextualizes the seizure within the febrile illness.",xKo:"단순 열성 경련은 보통 체온이 급격히 상승하는 시점에 발생하며, 종종 발열의 첫 징후로 나타난다. 며칠 동안 지속된 발열 이후 발생한 발작은 전형적이지 않으며 보다 면밀한 평가가 필요할 수 있다. 해열제 투여 여부와 발열 관리 상황을 확인하는 것은 급 성 평가뿐 아니라 퇴원 후 발열 관리 교육에도 중요하다. 이는 발작을 발열성 질환의 맥 락 속에서 해석하는 데 직접적인 정보를 제공한다."},
          {id:"4-2-2-13",pts:7,en:"Item 13. Fever Source Identification: Targeted questioning about upper respiratory symptoms (rhinorrhea, cough, sore throat), otitis media symptoms (ear pulling, irritability), urinary symptoms (dysuria, frequency, foul-smelling urine), GI symptoms, rash, and any localizing symptoms.",ko:"항목 13. 발열 원인 확인: 상기도 감염 증상(콧물, 기침, 인후통), 중이염 증상(귀를 잡 아당김, 보챔), 배뇨 증상(배뇨통, 빈뇨, 악취 나는 소변), 위장관 증상, 발진, 기타 국소 화 증상에 대해 표적 질문을 한다.",xEn:"Identifying the fever source is essential for two reasons: first, to manage the underlying illness, and second, to ensure the fever is attributable to a benign source rather than a serious bacterial infection (meningitis, bacteremia, UTI). A clear viral upper respiratory source (rhinorrhea, pharyngitis, sick contacts) provides diagnostic confidence. Failure to identify any fever source in a post-seizure toddler should prompt more thorough investigation. Substantial weighting reflects dual importance.",xKo:"발열의 원인을 확인하는 것은 두 가지 이유에서 중요하다. 첫째, 기저 질환을 적절 히 치료하기 위함이고, 둘째, 발열이 수막염, 균혈증, 요로감염과 같은 심각한 세균성 감염이 아니라 양성 원인에 의한 것인지 확인하기 위해서이다. 콧물, 인두염, 아픈 접촉자 와 같은 명확한 바이러스성 상기도 감염 증상이 있다면 진단적 확신이 높아진다. 반대로 발작 이후의 유아에서 발열 원인이전혀 확인되지 않는다면 보다 철저한 추가 평가가 필요하다. 이러한 이중적인 임상적 중요성을 반영하여 비교적 높은 가중치를 부여하였다."},
          {id:"4-2-2-14",pts:8,en:"Item 14. Meningitis and CNS Infection Exclusion: Direct questioning about neck stiffness, photophobia, inconsolability, bulging fontanelle (if still open), persistent vomiting, rash (particularly petechial/purpuric), and whether the child's behavior and interaction have truly returned to normal.",ko:"항목 14. 수막염 및 중추신경계 감염 배제: 목 경직, 광과민성, 달래기 어려운 보챔, (열 려 있다면) 대천문 팽창, 지속적인 구토, 발진(특히 점상출혈 또는 자반), 그리고 아이의 행동과 상호작용이 정말로 평소 상태로 완전히 돌아왔는지에 대해 직접 질문한다.",xEn:"The most dangerous missed diagnosis in a febrile child with a seizure is bacterial meningitis. While a well-appearing, immunized 18month-old with a clear viral source and nonfocal exam has low meningitis risk, the clinician must explicitly screen through history. Subtle signs — irritability, feeding refusal, inconsolable crying, light sensitivity — may be dismissed as postictal behavior. This receives high weighting as a critical safety question. The decision not to perform a lumbar puncture must be supported by a thorough history excluding CNS infection features.",xKo:"발열과 함께 발작이 발생한 소아에서 가장 치명적으로 놓칠 수 있는 진단은 세균 성 수막염이다. 예방접종을 완료했고 전반적으로 상태가 좋은 18개월 아동이며 명확한 바이러스성 원인이 있는 경우 수막염 가능성은 낮지만, 임상의는 반드시 병력 질문을 통 해 이를 명확히 배제해야 한다. 보챔, 수유 거부, 달래기 어려운 울음, 빛에 대한 민감성 과 같은 미묘한 증상은 발작 후 상태로 오해될 수 있다. 따라서 이러한 항목은 환자 안전 과 직결되는 핵심 질문으로 높은 가중치를 가진다. 요추천자를 시행하지 않기로 결정했 다면, 중추신경계 감염을 시사하는 병력 요소가 없음을 철저한 병력 청취로 뒷받침해야 한다."},
          {id:"4-2-2-15",pts:4,en:"Item 15. Family History of Febrile Seizures and Epilepsy: First-degree relatives with febrile seizures, epilepsy, or other neurological conditions.",ko:"항목 15. 열성 발작 및 뇌전증의 가족력: 직계 가족에서 열성 발작, 뇌전증, 또는 기타 신경계 질환의 병력이 있는지 확인한다.",xEn:"Febrile seizures have a strong genetic component — a positive family history in a first-degree relative increases recurrence risk to approximately 40–50%. This information is essential for accurate recurrence risk counseling during discharge education. Family history of epilepsy, while less directly linked, influences parental anxiety and may subtly alter the follow-up plan. Moderate weighting reflects its primary role in prognostication and counseling rather than acute management.",xKo:"열성 발작은 유전적 요인이 강하게 작용하는 질환으로, 직계 가족 중 열성 발작 병력이 있는 경우 재발 위험이 약 40–50%까지 증가한다. 이러한 정보는 퇴원 교육 과정 에서 재발 가능성에 대해 보호자에게 정확히 설명하는 데 매우 중요하다. 뇌전증의 가족 력은 열성 발작과 직접적인 연관성은 상대적으로 낮지만, 보호자의 불안 수준에 영향을 미치고 추후 추적 관찰 계획에 일부 영향을 줄 수 있다. 따라서 급성 처치보다는 예후 설 명과 상담에 주로 기여하는 요소로서 중등도의 가중치를 부여한다."},
          {id:"4-2-2-16",pts:4,en:"Item 16. Accidental Ingestion and Trauma Exclusion: Explicit questioning about access to medications (including adult medications, supplements, cannabis edibles), household toxins, recent falls or head trauma, and the child's activity and supervision in the hours preceding the event.",ko:"항목 16. 우발적 섭취 및 외상 배제: 약물 접근 가능 여부(성인용 약물, 보충제, 대마 성 분 식품 포함), 가정 내 독성 물질 노출, 최근 낙상이나 두부 외상, 그리고 발작 이전 몇 시간 동안 아이의 활동과 보호자 감독 상황에 대해 명확히 질문한다.",xEn:"Toddlers are at peak risk for accidental ingestion, and a toxicological seizure can be mistaken for a febrile seizure if the fever is coincidental or toxin-induced. Head trauma causing intracranial pathology with secondary fever is another important consideration. These questions must be asked directly, as caregivers may not volunteer this information due to fear or failure to make the connection. Moderate weighting reflects that the clinical picture does not suggest ingestion/trauma but the questions are mandatory.",xKo:"유아기는 우발적 약물 또는 독성 물질 섭취 위험이 가장 높은 시기이다. 독성 물질 에 의한 발작은 우연히 동반된 발열이나 독성에 의해 유발된 발열 때문에 열성 발작으로 오인될 수 있다. 또한 두부 외상으로 인한 두개내 병변이 발열과 함께 발작으로 나타날 가능성도 고려해야 한다. 보호자는 두려움이나 사건과의 연관성을 인지하지 못해 이러 한 정보를 자발적으로 말하지 않을 수 있으므로, 임상의가 반드시 직접 질문해야 한다. 임상 양상이 섭취나 외상을 강하게 시사하지는 않지만, 환자 안전을 위해 반드시 확인해 야 하는 항목이므로 중등도의 가중치를 부여한다."},
          {id:"4-2-2-17",pts:3,en:"Item 17. Parental Experience and Anxiety Assessment: What the parents did during the seizure, their emotional state, prior knowledge of febrile seizures, specific fears (brain damage, epilepsy, death), and readiness to receive education about recurrence management.",ko:"항목 17. 보호자의 경험 및 불안 평가: 발작 동안 보호자가 무엇을 했는지, 당시의 감정 상태, 열성 발작에 대한 사전 지식 여부, 구체적인 두려움(뇌 손상, 뇌전증, 사망 등), 그 리고 재발 시 대처 방법에 대한 교육을 받을 준비가 되어 있는지 확인한다.",xEn:"Witnessing a child's first seizure is among the most frightening parental experiences. Understanding what the parents observed, what they did (positioning, calling emergency services, timing the event), and their specific fears directly informs the quality of discharge counseling. A parent who believes their child was dying requires different communication than one with prior knowledge of febrile seizures. While not diagnostically relevant, this element is essential to a high-quality clinical encounter and safe discharge. Lower weighting reflects its non-diagnostic nature, but its inclusion signals that excellent history-taking integrates the human context.",xKo:"아이의 첫 발작을 목격하는 경험은 보호자에게 매우 큰 공포를 유발할 수 있다. 보호자가 무엇을 관찰했고, 발작 동안 어떤 행동을 했는지(아이의 자세를 바꾸었는지, 응급서비스를 호출했는지, 시간을 재려고 했는지 등), 그리고 어떤 점을 가장 두려워하는 지 이해하는 것은 퇴원 교육의 질에 직접적인 영향을 준다. 예를 들어 아이가 죽을 것 같 았다고 느낀 보호자에게는, 열성 발작에 대해 이미 알고 있는 보호자와는 다른 방식의 설명과 안심이 필요하다. 비록 진단 자체에는 직접적인 영향을 미치지 않지만, 이러한 요소는 높은 수준의 임상 상담과 안전한 퇴원 계획을 위해 중요하다. 따라서 가중치는 낮지만, 훌륭한 병력 청취가 환자와 가족의 인간적 맥락을 함께 고려해야 함을 반영하여 포함되었다."},
        ],
      },
      {
        id:"4-3", label_en:"Rubric 3", label_ko:"기준표 3", d1pts:40, d2pts:60,
        threshold_en:"Pass Threshold: 70/100. A score of 0 on Item 2.1 (Classification Criteria) constitutes a critical failure, as it prevents accurate diagnosis.",
        threshold_ko:"합격 기준: 70점. 항목 2.1 (분류 기준: 단순 vs 복합 열성 발작)에서 0점을 받을 경우 정확한 진단이 불가능해지므로 치명적 실패(Critical Fail)로 간주됨.",
        rationale_en:"", rationale_ko:"",
        d1desc_en:"This domain evaluates the candidate's ability to obtain a complete, structured general clinical history.",
        d1desc_ko:"이 영역은 완전하고 구조화된 일반 임상 병력을 청취하는 능력을 평가합니다.",
        d2desc_en:"This domain evaluates case-specific diagnostic history for febrile seizure classification.",
        d2desc_ko:"이 영역은 열성 경련 분류에 대한 사례 특이적 진단 병력을 평가합니다.",
        d1:[
          {id:"4-3-1-1",pts:5,en:"Item 1. Introduction and Parental Reassurance: Clearly introduces self and acknowledges the frightening nature of the event for the parents. Establishes the baseline health of the child before the event.",ko:"항목 1. 자기소개 및 보호자 안심시키기: 자신을 명확히 소개하고, 보호자에게 이번 사건이 매우 두려운 경험이었음을 인정한다. 또한 사건 이전 아이의 평소 건강 상태를 확인한다.",xEn:"Witnessing a child seize is often the most terrifying moment of a parent's life. Acknowledging this trauma builds the trust necessary to get an accurate history of the event, rather than just a panicked retelling.",xKo:"자녀의 발작을 목격하는 경험은 대부분의 부모에게 인생에서 가장 공포스러운 순 간 중 하나이다. 이러한 경험의 충격을 먼저 인정해 주는 것은 보호자와의 신뢰 형성에 매우 중요하다. 이는 보호자가 공황 상태에서 사건을 단순히 감정적으로 설명하는 것이 아니라, 실제로 관찰한 내용을 보다 정확하게 전달하도록 돕는다."},
          {id:"4-3-1-2",pts:10,en:"Item 2. Investigation of the Fever Source (Review of Systems): Systematically asks about potential sources of infection causing the fever. Specifically inquiries about respiratory symptoms (cough/rhinorrhea), GI symptoms (vomiting/diarrhea), urine output, and rashes.",ko:"항목 2. 발열 원인 조사 (Review of Systems): 발열을 유발할 수 있는 감염 원인을 체계적으로 확인한다. 특히 호흡기 증상(기침/콧물), 위장관 증상(구토/설사), 소변 배출 상태, 발진 여부에 대해 질문한다.",xEn:"A febrile seizure is a symptom, not a final diagnosis. The clinician must still identify the underlying infection (e.g., Otitis Media, UTI, Roseola). Missing the source of the fever is a failure of general pediatric care.",xKo:"열성 발작은 하나의 증상일 뿐 최종 진단이 아니다. 임상의는 여전히 발열의 근본 원인(예: 중이염, 요로감염, 돌발진 등)을 확인해야 한다. 발열의 원인을 놓치는 것은 일 반 소아 진료의 기본을 충족하지 못하는 것이다."},
          {id:"4-3-1-3",pts:10,en:"Item 3. Past Medical and Developmental History: Asks about birth history (prematurity), prior hospitalizations, and—crucially—developmental milestones.",ko:"항목 3. 과거력 및 발달력: 출생력(조산 여부), 이전 입원 병력, 그리고—특히—발달 이정표 달성 여부에 대해 질문한다.",xEn:"A seizure in a neuro-typical child is likely a simple febrile seizure. A seizure in a child with missed milestones or history of intraventricular hemorrhage shifts the probability toward epilepsy or complex pathology.",xKo:"신경학적으로 정상 발달을 보이는 아이에서 발생한 발작은 단순 열성 발작일 가능 성이 높다. 반면 발달 이정표 지연이 있거나 뇌실내 출혈(intraventricular hemorrhage) 병력이 있는 아이에서의 발작은 뇌전증이나 더 복잡한 신경학적 병변의 가능성을 높인다."},
          {id:"4-3-1-4",pts:5,en:"Item 4. Medications and Allergies: Confirms current medications (including antipyretics given prior to arrival) and allergies.",ko:"항목 4. 약물 및 알레르기 병력: 현재 복용 중인 약물(내원 전 투여된 해열제 포함)과 약 물 알레르기 여부를 확인한다.",xEn:"Essential to ensure the seizure was not caused by an adverse drug reaction or that the child isn't on medications that lower the seizure threshold (e.g., bupropion, though unlikely in a toddler, accidental ingestion Disagree 비동의 is possible).",xKo:"발작이 약물 이상반응으로 발생한 것은 아닌지 확인하고, 발작 역치를 낮출 수 있 는 약물(예: 부프로피온 등)을 복용 중인지 확인하기 위해 필수적이다. 비록 유아에서는 드물지만, 우발적 약물 섭취 가능성은 항상 고려해야 한다."},
          {id:"4-3-1-5",pts:10,en:"Item 5. Social History and Supervision: Inquires about who lives at home, who witnessed the event, and the reliability of the family to observe the child for recurrence.",ko:"항목 5. 사회력 및 보호 환경: 가정 내 동거 가족, 사건을 목격한 사람, 그리고 재발 시 아이를 관찰하고 대응할 수 있는 보호자의 신뢰성과 돌봄 환경에 대해 확인한다.",xEn:"Most simple febrile seizures are discharged home. The clinician must verify that the parents are capable of monitoring the child and have transport to return if the status changes.",xKo:"대부분의 단순 열성 발작 환아는 퇴원 후 가정에서 경과 관찰을 하게 된다. 따라서 보호자가 아이를 적절히 관찰할 수 있는지, 상태가 악화될 경우 병원으로 다시 올 수 있 는 교통 및 접근성이 있는지 등을 반드시 확인해야 한다."},
        ],
        d2:[
          {id:"4-3-2-6",pts:20,en:"Item 6. Classification of the Seizure (Simple vs. Complex Criteria): Must ask three specific questions to categorize the seizure - (1) Duration: Did it last < 15 minutes?; (2) Focality: Was it generalized (shaking all over) or focal (one arm/leg)?; (3) Recurrence: Has it happened more than once in 24 hours?",ko:"항목 6. 발작 분류 (단순 vs. 복합 기준): 발작을 분류하기 위해 반드시 세 가지 핵심 질 문을 해야 한다 — (1) 지속 시간: 15분 미만이었는가?; (2) 국소성: 전신 발작이었는가 (몸 전체가 떨림) 아니면 국소 발작이었는가(한쪽 팔/다리만 움직임)?; (3) 재발 여부: 24시간 내 두 번 이상 발생했는가?",xEn:"This is the most critical technical component. A \"Simple\" febrile seizure (generalized, <15 min, once in 24h) requires no workup. If the candidate fails to ask about focality or duration, they cannot safely discharge the patient.",xKo:"이는 가장 중요한 기술적 평가 요소이다. 단순 열성 발작(전신성, 15분 미만, 24 시간 내 1회)은 추가 검사가 필요하지 않다. 반대로 국소성 여부나 지속 시간을 확인하 지 않으면 발작을 안전하게 분류할 수 없으며, 환자를 안전하게 퇴원시키는 것도 불가능 하다."},
          {id:"4-3-2-7",pts:15,en:"Item 7. Post-Ictal Assessment and Recovery: Asks specifically about the child’s condition immediately after the shaking stopped. Did they cry? Did they sleep? How long did it take to return to baseline mental status?",ko:"항목 7. 발작 후 상태(Post-Ictal) 평가 및 회복: 발작이 멈춘 직후 아이의 상태에 대 해 구체적으로 질문한다. 울었는지, 잠이 들었는지, 그리고 평소의 정신 상태로 완전히 돌아오기까지 얼마나 시간이 걸렸는지를 확인한다.",xEn:"A prolonged post-ictal period (>1 hour of altered mental status) is a red flag for meningitis or non-convulsive status epilepticus. The vignette notes \"15 minutes of sleepiness then full recovery,\" which is classic for a benign event.",xKo:"발작 후 상태가 오래 지속되는 경우(예: 1시간 이상 의식 변화 지속)는 수막염이나 비경련성 지속성 간질(non-convulsive status epilepticus)을 시사하는 경고 신호일 수 있다. 본 증례에서는 “약 15분간 졸림 후 완전히 회복”되었다고 기술되어 있으며, 이 는 전형적인 양성 열성 발작의 회복 양상이다."},
          {id:"4-3-2-8",pts:10,en:"Item 8. Meningitis Risk Assessment (Vaccination & CNS Symptoms): Explicitly asks if immunizations are up to date (specifically Hib and Prevnar) and asks about symptoms prior to the seizure: irritability, lethargy, or neck stiffness.",ko:"항목 8. 수막염 위험 평가 (예방접종 및 중추신경계 증상): 예방접종이 최신 상태인지 (특히 Hib와 Prevnar), 그리고 발작 이전에 보챔, 무기력, 목 경직과 같은 증상이 있었 는지 명확히 질문한다.",xEn:"In a fully immunized child with a simple febrile seizure, the risk of bacterial meningitis is negligible. If the child is unvaccinated, the risk calculus changes entirely, potentially necessitating a lumbar puncture.",xKo:"예방접종을 완료한 아이에서 단순 열성 발작이 발생한 경우 세균성 수막염의 위험 은 매우 낮다. 그러나 예방접종이 이루어지지 않은 경우 위험도 평가는 완전히 달라지 며, 요추천자와 같은 추가 검사가 필요할 수 있다."},
          {id:"4-3-2-9",pts:10,en:"Item 9. Exclusion of Trauma and Toxic Ingestion: Asks if the onset was witnessed (to rule out a fall/head trauma causing the seizure) and if there are any accessible medications/toxins in the home (e.g., camphor, hypoglycemics, antidepressants).",ko:"항목 9. 외상 및 독성 물질 섭취 배제: 발작 발생이 목격된 상황이었는지(낙상이나 두부 외상으로 인한 발작 가능성 배제) 확인하고, 가정 내 접근 가능한 약물이나 독성 물질 (예: 장뇌, 저혈당 유발 약물, 항우울제 등)이 있는지 질문한다.",xEn:"\"Fever and seizure\" can sometimes be \"Seizure from trauma/poison + incidental viral fever.\" A thorough history taker rules out the \"unlucky coincidence\" to ensure safety.",xKo:"“발열과 발작”으로 보이는 상황이 실제로는 “외상이나 독성 물질로 인한 발작 + 우연히 동반된 바이러스성 발열”일 수도 있다. 철저한 병력 청취를 통해 이러한 “우연한 동반 상황”을 배제해야 환자 안전을 보장할 수 있다."},
          {id:"4-3-2-10",pts:5,en:"Item 10. Family History of Seizures: Asks about a family history of febrile seizures (benign genetic predisposition) versus epilepsy (chronic neurological disease).",ko:"항목 10. 발작의 가족력: 열성 발작의 가족력(양성 유전적 소인)과 뇌전증의 가족력(만 성 신경계 질환)을 구분하여 질문한다.",xEn:"A family history of febrile seizures is the strongest predictor of recurrence. This information allows the consultant to counsel the parents on what to expect in future febrile illnesses.",xKo:"열성 발작의 가족력은 재발을 예측하는 가장 강력한 요인이다. 이러한 정보는 향 후 발열 질환이 발생했을 때 어떤 상황이 예상될 수 있는지 보호자에게 설명하고 교육하 는 데 도움이 된다."},
        ],
      },
      {
        id:"4-4", label_en:"Rubric 4", label_ko:"기준표 4", d1pts:40, d2pts:60,
        threshold_en:"", threshold_ko:"",
        rationale_en:"", rationale_ko:"",
        d1desc_en:"This domain evaluates the candidate's ability to structure the interview and gather standard medical context for a toddler presenting with a first seizure.",
        d1desc_ko:"이 영역은 첫 번째 발작을 보이는 유아에 대한 면담 구조화 및 표준 의학적 맥락 수집 능력을 평가합니다.",
        d2desc_en:"This domain evaluates case-specific diagnostic history for simple febrile seizure — classifying seizure type, identifying fever source, and excluding meningitis.",
        d2desc_ko:"이 영역은 단순 열성 경련에 대한 사례 특이적 진단 병력을 평가합니다 — 발작 유형 분류, 발열 원인 파악, 수막염 배제.",
        d1:[
          {id:"4-4-1-1",pts:8,en:"Item 1. Establishes Event Timeline and Context: Clarifies timing of fever onset, timing of seizure relative to fever, sequence of events, duration Disagree 비동의 of seizure, and recovery phase.",ko:"항목 1. 사건의 시간적 경과 및 맥락 파악: 발열 시작 시점, 발열과 발작의 시간적 관계, 사건의 순서, 발작 지속 시간, 그리고 발작 이후 회복 과정까지 명확히 확인한다.",xEn:"A precise chronology is essential to determine whether the event meets criteria for a febrile seizure and to exclude other causes (e.g., primary epilepsy, syncope).",xKo:"정확한 시간적 경과를 파악하는 것은 해당 사건이 열성 발작의 기준에 부합하는지 판단하고, 다른 원인(예: 원발성 뇌전증, 실신 등)을 배제하는 데 필수적이다."},
          {id:"4-4-1-2",pts:10,en:"Item 2. Detailed Description of the Seizure Event: Elicits semiology (generalized vs focal onset), motor activity, eye deviation, color change, incontinence, responsiveness, duration (measured vs estimated), and need for intervention.",ko:"항목 2. 발작 사건의 상세한 묘사: 발작 양상(semiology), 즉 전신성인지 국소성인지, 운동 양상, 안구 편위, 피부색 변화, 실금 여부, 반응성, 지속 시간(실제 측정인지 추정인 지), 그리고 중재가 필요했는지를 확인한다.",xEn:"Accurate seizure characterization determines whether it is simple vs complex and guides further workup.",xKo:"발작의 양상을 정확히 파악하는 것은 단순 열성 발작인지 복합 열성 발작인지 구 분하고, 추가적인 검사 필요 여부를 결정하는 데 핵심적이다."},
          {id:"4-4-1-3",pts:6,en:"Item 3. Postictal State Assessment: Asks about duration of altered consciousness, confusion, focal weakness (Todd paralysis), and return to baseline behavior.",ko:"항목 3. 발작 후 상태(Postictal) 평가: 의식 변화의 지속 시간, 혼돈 상태, 국소적 약 화(Todd 마비), 그리고 평소 행동 상태로의 회복 여부를 질문한다.",xEn:"Persistent focal deficits or prolonged altered mental status suggest complex seizure or intracranial pathology.",xKo:"지속적인 국소 신경학적 결손이나 장시간 지속되는 의식 변화는 복합 발작이나 두 개내 병변을 시사할 수 있다."},
          {id:"4-4-1-4",pts:6,en:"Item 4. Red-Flag Symptom Screening: Screens for signs of meningitis/encephalitis (neck stiffness, photophobia, persistent lethargy), trauma, toxic ingestion, persistent vomiting, petechial rash.",ko:"항목 4. 위험 신호 증상 선별: 수막염/뇌염을 시사하는 증상(목 경직, 광과민성, 지속적 인 무기력), 외상, 독성 물질 섭취, 지속적인 구토, 점상출혈성 발진 여부를 확인한다.",xEn:"Identifying life-threatening alternative causes of seizure is critical in emergency evaluation.",xKo:"발작의 생명을 위협할 수 있는 다른 원인을 확인하는 것은 응급 평가에서 매우 중요하다."},
          {id:"4-4-1-5",pts:4,en:"Item 5. Past Medical and Developmental History: Reviews prior neurologic issues, developmental delay, regression, prior afebrile seizures, perinatal complications.",ko:"항목 5. 과거력 및 발달력: 이전 신경학적 문제, 발달 지연, 발달 퇴행, 이전의 비열성 발작, 주산기 합병증 여부를 확인한다.",xEn:"Underlying neurologic abnormalities increase risk of epilepsy and complex seizures.",xKo:"기저 신경학적 이상이 있는 경우 뇌전증이나 복합 발작의 위험이 증가한다."},
          {id:"4-4-1-6",pts:3,en:"Item 6. Medication, Allergy, and Exposure History: Assesses medication access, possible ingestions, recent vaccinations, toxin exposure.",ko:"항목 6. 약물, 알레르기 및 노출 병력: 약물 접근 가능 여부, 우발적 섭취 가능성, 최근 예방접종, 독성 물질 노출 여부를 확인한다.",xEn:"Toxicologic or vaccine-related timing considerations may influence differential diagnosis.",xKo:"독성 물질에 의한 발작이나 예방접종과 관련된 발열 시기 등은 감별 진단에 영향 을 줄 수 있다."},
          {id:"4-4-1-7",pts:3,en:"Item 7. Family and Social History: Asks about family history of febrile seizures or epilepsy; daycare exposure to illness.",ko:"항목 7. 가족력 및 사회력: 열성 발작이나 뇌전증의 가족력, 그리고 어린이집/유치원 등 에서의 감염 노출 여부를 확인한다.",xEn:"Family history increases recurrence risk and helps contextualize the febrile trigger.",xKo:"가족력은 열성 발작의 재발 위험을 높이며, 감염 노출력은 발열의 원인을 이해하 는 데 도움이 된다."},
        ],
        d2:[
          {id:"4-4-2-8",pts:15,en:"Item 8. Confirms Criteria for Simple Febrile Seizure: Establishes that seizure was generalized, lasted <15 minutes, occurred once in 24 hours, and child returned fully to neurologic baseline.",ko:"항목 8. 단순 열성 발작 기준 확인: 발작이전신성이었는지, 15분 미만으로 지속되었는 지, 24시간 내 1회만 발생했는지, 그리고 아이가 신경학적으로 완전히 평소 상태로 회복했는지를 확인한다.",xEn:"This is the core diagnostic determination that distinguishes simple from complex febrile seizure and dictates need for further workup.",xKo:"이는 단순 열성 발작과 복합 열성 발작을 구분하는 핵심 진단 요소이며, 추가 검사 필요 여부를 결정하는 가장 중요한 판단 기준이다."},
          {id:"4-4-2-9",pts:10,en:"Item 9. Assesses Fever Source and Infectious Symptoms: Identifies URI symptoms, otitis, urinary symptoms, rash, or other focal infection signs.",ko:"항목 9. 발열 원인 및 감염 증상 평가: 상기도 감염 증상, 중이염, 요로 증상, 발진, 또는 기타 국소 감염 징후를 확인한다.",xEn:"Management focuses on identifying the cause of fever rather than the seizure itself.",xKo:"치료의 핵심은 발작 자체보다는 발열의 원인을 확인하고 관리하는 데 있다."},
          {id:"4-4-2-10",pts:10,en:"Item 10. Excludes Central Nervous System Infection: Specifically screens for persistent irritability, inconsolability, bulging fontanelle (if applicable), neck stiffness, photophobia, prolonged altered consciousness.",ko:"항목 10. 중추신경계 감염 배제: 지속적인 보챔, 달래기 어려움, (해당되는 경우) 대천 문 팽창, 목 경직, 광과민성, 장시간 지속되는 의식 변화 여부를 확인한다.",xEn:"Missing meningitis or encephalitis has high morbidity; exclusion is critical.",xKo:"수막염이나 뇌염을 놓칠 경우 높은 이환율을 초래할 수 있으므로, 이를 배제하는 과정은 매우 중요하다."},
          {id:"4-4-2-11",pts:8,en:"Item 11. Evaluates Risk Factors for Complex Seizure/Epilepsy: Asks about age <12 months, developmental delay, prior neurologic disease, family history of epilepsy.",ko:"항목 11. 복합 발작/뇌전증 위험 요인 평가: 12개월 미만의 연령, 발달 지연, 이전 신경 학적 질환, 뇌전증의 가족력 여부를 확인한다.",xEn:"These factors affect recurrence risk and need for closer follow-up.",xKo:"이러한 요인들은 발작 재발 위험과 보다 면밀한 추적 관찰 필요성에 영향을 미친 다."},
          {id:"4-4-2-12",pts:6,en:"Item 12. Assesses Recurrence Within 24 Hours: Clarifies whether multiple seizures occurred during same febrile illness.",ko:"항목 12. 24시간 내 재발 여부 평가: 동일한 발열 질환 동안 24시간 내에 여러 번의 발작이 발생했는지 확인한다.",xEn:"Multiple seizures in 24 hours would classify as complex and alter evaluation.",xKo:"24시간 내 반복 발작이 있는 경우 복합 열성 발작으로 분류되며, 평가와 관리 방 침이 달라질 수 있다."},
          {id:"4-4-2-13",pts:5,en:"Item 13. Documents Fever Characteristics and Management: Asks maximum temperature, measurement method, response to antipyretics, and hydration status.",ko:"항목 13. 발열 양상 및 관리 확인: 최고 체온, 체온 측정 방법, 해열제에 대한 반응, 그리 고 수분 상태를 확인한다.",xEn:"Helps contextualize seizure trigger and caregiver education.",xKo:"발작을 유발한 발열의 맥락을 이해하고 보호자 교육을 진행하는 데 도움이 된다."},
          {id:"4-4-2-14",pts:4,en:"Item 14. Screens for Metabolic or Toxic Causes: Asks about poor intake, dehydration, access to medications, accidental ingestion.",ko:"항목 14. 대사성 또는 독성 원인 선별: 섭취 감소, 탈수, 약물 접근 가능성, 우발적 약물 섭취 여부를 확인한다.",xEn:"Although less likely in classic presentation, metabolic derangements must be considered.",xKo:"전형적인 임상 양상에서는 가능성이 낮지만, 대사 이상이나 독성 물질로 인한 발작 가능성은 항상 고려해야 한다."},
          {id:"4-4-2-15",pts:2,en:"Item 15. Assesses Caregiver Understanding and Safety Concerns: Explores parental description of event, first-aid measures used, concerns, and ability to manage recurrence.",ko:"항목 15. 보호자의 이해도 및 안전 우려 평가: 사건에 대한 보호자의 설명, 시행한 응급 처치, 보호자의 우려 사항, 재발 시 대응 능력을 확인한다.",xEn:"Counseling and anticipatory guidance are central in febrile seizure management.",xKo:"열성 발작 관리에서 보호자 교육과 향후 상황에 대한 안내는 매우 중요한 요소입니다."},
        ],
      },
    ],
  },
  {
    id: 5,
    en: "Case 5: Adolescent with right-lower-quadrant pain — acute appendicitis",
    ko: "사례 5: 우하복부 통증을 호소하는 청소년 — 급성 충수염",
    vignette: {
      rows: [
        { en:"Chief Complaint", ko:"주 호소", val_en:"Right lower quadrant abdominal pain with fever and nausea", val_ko:"발열과 오심을 동반한 우하복부 복통" },
        { en:"History of Presenting Illness", ko:"현병력", val_en:"12-year-old girl with 24 hours of abdominal pain starting periumbilically and migrating to the right lower quadrant, associated with anorexia and nausea. Two episodes of non-bilious emesis, no diarrhea. Reports low-grade fever at home. Pain worsens with movement and coughing. Last menstrual period 3 weeks ago; denies dysuria or vaginal discharge.", val_ko:"12세 여아로 24시간 전부터 시작된 복통이 처음에는 배꼽 주위에서 시작하여 우하복부로 이동함. 식욕부진과 오심이 동반됨. 비담즙성 구토 2회 있었으며 설사는 없음. 집에서 미열을 보고함. 움직이거나 기침할 때 통증이 악화됨. 마지막 월경은 3주 전이며 배뇨통이나 질 분비물은 부인함." },
        { en:"Past Medical History", ko:"과거 병력", val_en:"Healthy; no prior abdominal surgeries.", val_ko:"건강하였으며 이전 복부 수술력 없음." },
        { en:"Medications", ko:"복용 약물", val_en:"None.", val_ko:"없음." },
        { en:"Allergies", ko:"알레르기", val_en:"No known drug allergies.", val_ko:"알려진 약물 알레르기 없음." },
        { en:"Family/Social History", ko:"사회력/가족력", val_en:"Lives with parents; no family history of IBD.", val_ko:"부모와 함께 거주. 염증성 장질환(IBD) 가족력 없음." },
        { en:"Immunizations", ko:"예방접종", val_en:"Up-to-date.", val_ko:"접종 완료." },
        { en:"Review of Systems", ko:"계통별 문진", val_en:"Positive for anorexia, nausea, RLQ pain, fever; negative for diarrhea, urinary symptoms, respiratory symptoms.", val_ko:"식욕부진, 오심, 우하복부 통증, 발열 있음. 설사, 비뇨기 증상, 호흡기 증상 없음." },
      ],
      vitals: [
        { en:"Age", ko:"연령", val_en:"12 years", val_ko:"12세" },
        { en:"Temperature", ko:"체온", val_en:"38.2°C (36.5–37.5°C)", val_ko:"38.2°C (36.5–37.5°C)" },
        { en:"Heart Rate", ko:"심박수", val_en:"110 bpm (60–100 bpm) — mild tachycardia", val_ko:"110 bpm (60–100 bpm) — 경미한 빈맥" },
        { en:"Respiratory Rate", ko:"호흡수", val_en:"20 breaths/min (12–20 breaths/min)", val_ko:"20회/분 (12–20회/분)" },
        { en:"Blood Pressure", ko:"혈압", val_en:"104/66 mmHg (100–120/60–80 mmHg)", val_ko:"104/66 mmHg (100–120/60–80 mmHg)" },
        { en:"SpO₂", ko:"SpO₂", val_en:"98% on room air (≥95%)", val_ko:"98% 실내 공기 (≥95%)" },
      ],
      exam: [
        { en:"General", ko:"전반", val_en:"Uncomfortable, prefers to lie still", val_ko:"불편해 보이며 움직이지 않고 누워 있으려 함" },
        { en:"Abdomen", ko:"복부", val_en:"Localized tenderness at McBurney's point with guarding; rebound tenderness present; positive Rovsing and psoas signs; no masses; bowel sounds decreased", val_ko:"McBurney point 국소 압통, 근긴장(guarding)과 반발통 있음; Rovsing sign 및 psoas sign 양성; 종괴 없음; 장음 감소" },
        { en:"HEENT/Respiratory", ko:"HEENT/호흡기", val_en:"Oropharynx clear; lungs clear to auscultation", val_ko:"인두 깨끗함; 폐 청진 정상" },
        { en:"Cardiovascular", ko:"심혈관", val_en:"Regular rhythm, no murmur", val_ko:"규칙적 리듬, 심잡음 없음" },
        { en:"GU", ko:"비뇨생식기", val_en:"No CVA tenderness", val_ko:"늑골척추각 압통 없음" },
        { en:"Neuro/Skin", ko:"신경/피부", val_en:"No focal deficits; skin warm, no rash", val_ko:"국소 신경학적 이상 없음; 피부 따뜻하며 발진 없음" },
      ],
    },
    rubrics: [
      {
        id:"5-1", label_en:"Rubric 1", label_ko:"기준표 1", d1pts:40, d2pts:60,
        threshold_en:"", threshold_ko:"",
        rationale_en:"", rationale_ko:"",
        d1desc_en:"This domain evaluates the candidate's ability to obtain a complete, structured general clinical history applicable to any pediatric emergency presentation.",
        d1desc_ko:"이 영역은 모든 소아 응급 상황에 적용 가능한 완전하고 구조화된 일반 임상 병력을 청취하는 능력을 평가합니다.",
        d2desc_en:"This domain evaluates case-specific diagnostic history for suspected acute appendicitis in an adolescent.",
        d2desc_ko:"이 영역은 청소년에서 의심되는 급성 충수염에 대한 사례 특이적 진단 병력을 평가합니다.",
        d1:[
          {id:"5-1-1-1",pts:8,en:"Item 1. Establishes Symptom Timeline and Pain Migration: Clarifies exact onset, progression, and migration of pain (periumbilical to RLQ), and temporal relationship to nausea, vomiting, and fever.",ko:"항목 1. 증상 발생 시점 및 통증 이동 확인: 통증의 정확한 시작 시점, 진행 양상, 통증 의 이동(배꼽 주위에서 우하복부로), 그리고 오심·구토·발열과의 시간적 관계를 명확히 확인한다.",xEn:"A clear chronology, especially migration of pain, is central to appendicitis diagnosis and risk stratification.",xKo:"특히 통증의 이동 양상을 포함한 명확한 시간적 경과는 충수염 진단과 위험도 평가에서 핵심적인 요소이다."},
          {id:"5-1-1-2",pts:8,en:"Item 2. Comprehensive Pain Characterization: Assesses location, radiation, intensity, quality, aggravating factors (movement, coughing), relieving factors, and progression.",ko:"항목 2. 통증의 포괄적 특성 평가: 통증의 위치, 방사 여부, 강도, 성질, 악화 요인(움직 임, 기침), 완화 요인, 진행 양상을 평가한다.",xEn:"Detailed pain analysis helps distinguish surgical from nonsurgical causes of abdominal pain.",xKo:"통증을 상세히 분석하는 것은 복통의 원인이 외과적 질환인지 비외과적 질환인지 감별하는 데 도움이 된다."},
          {id:"5-1-1-3",pts:6,en:"Item 3. Associated and Red-Flag Symptom Review: Screens for bilious emesis, persistent vomiting, diarrhea, obstipation, hematochezia, syncope, severe systemic toxicity.",ko:"항목 3. 동반 증상 및 위험 신호 평가: 담즙성 구토, 지속적인 구토, 설사, 변비/배변 정 지, 혈변, 실신, 심한 전신 독성 증상 여부를 확인한다.",xEn:"Identifies complications (e.g., obstruction, perforation) or alternative diagnoses requiring urgent action.",xKo:"장폐색, 천공과 같은 합병증이나 즉각적인 처치가 필요한 다른 진단을 확인하는 데 도움이 된다."},
          {id:"5-1-1-4",pts:4,en:"Item 4. Past Medical and Surgical History: Reviews prior abdominal surgeries, chronic GI disease, gynecologic history, and baseline bowel habits.",ko:"항목 4. 과거 병력 및 수술력: 이전 복부 수술력, 만성 위장관 질환, 부인과 병력, 평소 배변 습관을 확인한다.",xEn:"Prior surgery alters anatomy; chronic conditions (e.g., IBD) broaden differential.",xKo:"이전 수술력은 복부 해부학을 변화시킬 수 있으며, 만성 질환(예: 염증성 장질환) 은 감별 진단의 범위를 넓힌다."},
          {id:"5-1-1-5",pts:3,en:"Item 5. Medication and Allergy History: Identifies current medications and allergies, especially antibiotics or analgesics.",ko:"항목 5. 약물 및 알레르기 병력: 현재 복용 중인 약물과 알레르기 여부를 확인하며, 특 히 항생제나 진통제 사용 여부를 확인한다.",xEn:"Essential for perioperative planning and safe prescribing.",xKo:"수술 전후 치료 계획 수립과 안전한 약물 처방을 위해 필수적인 정보이다."},
          {id:"5-1-1-6",pts:5,en:"Item 6. Menstrual and Sexual History (Age-Appropriate): Documents last menstrual period, cycle regularity, sexual activity (if appropriate and confidentially obtained), contraception use.",ko:"항목 6. 월경 및 성 관련 병력(연령에 적절하게): 마지막 월경 시기, 월경 주기의 규칙 성, 성관계 여부(적절한 경우 비밀 보장을 전제로 확인), 피임 사용 여부를 확인한다.",xEn:"In adolescent females, pregnancy and gynecologic causes must be systematically considered. Disagree 비동의",xKo:"청소년 여성의 경우 임신 및 부인과적 원인을 체계적으로 감별 진단에 포함해야 한다."},
          {id:"5-1-1-7",pts:2,en:"Item 7. Family and Social History: Screens for family history of IBD or relevant GI disorders; assesses support system.",ko:"항목 7. 가족력 및 사회력: 염증성 장질환(IBD) 또는 관련 위장관 질환의 가족력 여부 를 확인하고, 환자의 돌봄 및 지원 체계를 평가한다.",xEn:"Family history may suggest alternative diagnoses; support impacts postoperative planning.",xKo:"가족력은 대안적 진단 가능성을 시사할 수 있으며, 보호자 및 가정의 지원 체계는 수술 후 관리 계획에 영향을 미친다."},
          {id:"5-1-1-8",pts:4,en:"Item 8. Structured Review of Systems: Performs focused ROS including urinary, respiratory, and gynecologic systems.",ko:"항목 8. 체계적인 계통별 문진: 비뇨기계, 호흡기계, 부인과계를 포함한 집중적인 계통 별 문진을 시행한다.",xEn:"Prevents premature closure and ensures competing causes of RLQ pain are evaluated.",xKo:"조기 진단 확정을 피하고 우하복부 통증의 다른 가능한 원인들을 평가하도록 돕는 다."},
        ],
        d2:[
          {id:"5-1-2-9",pts:15,en:"Item 9. Classic Appendicitis Features: Elicits anorexia, periumbilical pain migrating to RLQ, fever, nausea/vomiting occurring after pain onset.",ko:"항목 9. 전형적인 충수염 증상 확인: 식욕부진, 배꼽 주위에서 시작하여 우하복부로 이 동하는 통증, 발열, 통증 발생 이후 나타나는 오심/구토 여부를 확인한다.",xEn:"These hallmark features form the clinical basis of appendicitis scoring systems and carry the greatest diagnostic weight.",xKo:"이러한 특징적인 증상들은 충수염 점수 체계의 임상적 기반을 이루며 진단에서 가 장 높은 중요도를 가진다."},
          {id:"5-1-2-10",pts:8,en:"Item 10. Differentiates Surgical from Gastroenteritis: Asks specifically about diarrhea, diffuse cramping pain, sick contacts, and vomiting preceding pain.",ko:"항목 10. 외과적 질환과 위장염의 감별: 설사, 복부 전반의 경련성 통증, 아픈 접촉자 여부, 그리고 통증보다 구토가 먼저 발생했는지를 확인한다.",xEn:"Gastroenteritis is a common mimic; distinguishing sequence and symptom profile is critical.",xKo:"위장염은 충수염과 혼동되기 쉬운 흔한 질환이므로, 증상의 발생 순서와 특징을 구분하는 것이 중요하다."},
          {id:"5-1-2-11",pts:8,en:"Item 11. Assesses for Perforation or Complication: Screens for escalating pain, generalized abdominal pain, persistent high fever, rigors, abdominal distension.",ko:"항목 11. 천공 또는 합병증 평가: 통증의 악화, 전반적인 복통으로의 확산, 지속적인 고 열, 오한, 복부 팽만 여부를 확인한다.",xEn:"Perforation changes urgency, antibiotic coverage, and surgical planning.",xKo:"충수 천공이 발생한 경우 치료의 긴급성, 항생제 선택, 수술 계획이 모두 달라질 수 있다."},
          {id:"5-1-2-12",pts:6,en:"Item 12. Evaluates Urinary Tract Mimics: Clarifies dysuria, frequency, hematuria, flank pain.",ko:"항목 12. 요로 질환 감별 평가: 배뇨통, 빈뇨, 혈뇨, 옆구리 통증 여부를 확인한다.",xEn:"UTI and ureteral stone can present with RLQ pain and must be excluded.",xKo:"요로감염이나 요관 결석은 우하복부 통증으로 나타날 수 있으므로 반드시 감별해 야 한다."},
          {id:"5-1-2-13",pts:10,en:"Item 13. Evaluates Gynecologic Causes of RLQ Pain: Screens for ovarian torsion (sudden severe pain), ovarian cyst rupture, mittelschmerz, pelvic inflammatory disease (if sexually active), vaginal discharge or bleeding.",ko:"항목 13. 우하복부 통증의 부인과적 원인 평가: 난소 염전(갑작스럽고 심한 통증), 난소 낭종 파열, 배란통(mittelschmerz), 골반염(성관계가 있는 경우), 질 분비물 또는 질 출 혈 여부를 확인한다.",xEn:"In adolescent females, gynecologic pathology is a critical alternative diagnosis with potentially time-sensitive management.",xKo:"청소년 여성에서는 부인과적 질환이 중요한 감별 진단이며, 일부 질환은 시간에 민감한 치료가 필요할 수 있다."},
          {id:"5-1-2-14",pts:5,en:"Item 14. Pregnancy Risk Assessment: Confidential assessment of sexual activity and pregnancy risk beyond simply documenting LMP.",ko:"항목 14. 임신 위험 평가: 단순히 마지막 월경 시기(LMP)를 기록하는 것을 넘어, 성관 계 여부와 임신 가능성에 대해 비밀을 보장한 상태에서 평가한다.",xEn:"Ectopic pregnancy is life-threatening and must be excluded in post-menarchal adolescents.",xKo:"자궁외 임신은 생명을 위협할 수 있으므로, 초경 이후의 청소년에서는 반드시 배 제해야 한다."},
          {id:"5-1-2-15",pts:4,en:"Item 15. Assesses Functional Status and Pain Behavior: Determines ability to ambulate, hop, tolerate transport, and whether patient prefers to lie still.",ko:"항목 15. 기능 상태 및 통증 행동 평가: 보행 가능 여부, 점프 가능 여부, 이동 시 통증 여부, 그리고 환자가 가만히 누워 있으려 하는지 등을 확인한다.",xEn:"Pain worsened by movement supports peritoneal irritation and surgical pathology.",xKo:"움직일 때 통증이 악화되는 양상은 복막 자극과 외과적 병변을 시사한다."},
          {id:"5-1-2-16",pts:4,en:"Item 16. Reviews Prior Episodes or Recurrent Abdominal Pain: Asks about similar past episodes or chronic intermittent pain.",ko:"항목 16. 이전 유사 증상 또는 반복되는 복통 평가: 과거에 비슷한 증상이 있었는지 또 는 만성적·간헐적 복통이 있었는지 확인한다.",xEn:"Recurrent or chronic pain may suggest alternative diagnoses (e.g., mesenteric adenitis, IBD).",xKo:"반복되거나 만성적인 복통은 다른 진단(예: 장간막 림프절염, 염증성 장질환 등)을 시사할 수 있다."},
        ],
      },
      {
        id:"5-2", label_en:"Rubric 2", label_ko:"기준표 2", d1pts:40, d2pts:60,
        threshold_en:"Pass Threshold: 70/100. Failure to perform a private interview regarding sexual history/LMP (Item 1.1 + 2.3) constitutes a critical failure in an adolescent female abdominal pain case.",
        threshold_ko:"합격 기준: 70점. 청소년 여성 복통 환자에서 성 관련 병력 및 마지막 월경 시기(LMP)에 대해 보호자와 분리된 개인 면담을 시행하지 않은 경우 치명적 실패(Critical Fail)로 간주됨.",
        rationale_en:"", rationale_ko:"",
        d1desc_en:"This domain evaluates the candidate's ability to conduct an adolescent-appropriate clinical interview, ensuring privacy and directly eliciting sensitive history that is critical for this presentation.",
        d1desc_ko:"이 영역은 청소년에게 적합한 임상 면담을 수행하는 능력을 평가합니다. 사생활을 보장하고 이 증상에 중요한 민감한 병력을 직접 확인하는 것이 포함됩니다.",
        d2desc_en:"This domain evaluates case-specific diagnostic history for suspected acute appendicitis in an adolescent female.",
        d2desc_ko:"이 영역은 청소년 여성에서 의심되는 급성 충수염에 대한 사례 특이적 진단 병력을 평가합니다.",
        d1:[
          {id:"5-2-1-1",pts:10,en:"Item 1. Adolescent-Centric Communication & Privacy: Directs questions primarily to the patient rather than the parents. Appropriately establishes a confidential space (asking parents to step out) for sensitive questions regarding sexual history and safety.",ko:"항목 1. 청소년 중심 의사소통 및 사생활 보호: 질문을 주로 부모가 아니라 환자 본인에 게 직접 한다. 성 관련 병력 및 안전과 관련된 민감한 질문을 위해 보호자에게 잠시 나가 달라고 요청하여 비밀이 보장되는 환경을 적절히 마련한다.",xEn:"In a 12-year-old, the patient is the primary historian. Furthermore, accurately assessing the risk of ectopic pregnancy or PID requires a private interview. Failure to separate the patient from parents for these questions is a significant error in this age group.",xKo:"12세 청소년의 경우 환자 본인이 가장 중요한 병력 제공자이다. 또한 자궁외 임신 이나 골반염(PID)의 위험을 정확히 평가하기 위해서는 개인적인 면담이 필요하다. 이러 한 질문을 위해 환자와 보호자를 분리하지 않는 것은 이 연령대에서 중대한 오류로 간주 된다."},
          {id:"5-2-1-2",pts:10,en:"Item 2. Chronology and Pain Progression (HPI): Elicits the precise onset (24 hours ago) and the progression of the pain. Specifically asks if the pain has moved or changed location since it started.",ko:"항목 2. 시간 경과 및 통증 진행 양상(HPI): 통증의 정확한 시작 시점(약 24시간 전)과 통증의 진행 양상을 확인한다. 특히 통증이 시작 이후 위치가 이동했는지 또는 변화했는 지를 구체적으로 질문한다.",xEn:"The timeline is vital. Pain that starts periumbilically and migrates to the RLQ is the classic pathophysiology of appendicitis (visceral to somatic pain transition). Capturing this \"story\" is often more diagnostic than the physical exam.",xKo:"시간적 경과 파악은 매우 중요하다. 배꼽 주위에서 시작해 우하복부로 이동하는 통증은 충수염의 전형적인 병태생리(내장성 통증에서 체성 통증으로의 전환)를 반영합니다. 이러한 “통증의 이야기(story)”를 정확히 파악하는 것은 때로는 신체 진찰보다 더 Disagree 비동의 진단적 가치가 있다."},
          {id:"5-2-1-3",pts:5,en:"Item 3. Past Medical and Surgical History: Asks about previous abdominal surgeries (appendectomy, ovarian cysts) and underlying medical conditions (e.g., Sickle Cell, Inflammatory Bowel Disease).",ko:"항목 3. 과거 병력 및 수술력: 이전 복부 수술력(충수절제술, 난소 낭종 등)과 기저 질환 (예: 겸상적혈구병, 염증성 장질환 등)을 확인한다.",xEn:"One must rule out that the patient has already had an appendectomy (stump appendicitis is rare). Knowing family history of IBD is also relevant for chronic abdominal pain presentations.",xKo:"환자가 이미 충수절제술을 받은 적이 있는지 반드시 확인해야 한다(잔여 충수염은 드물지만 가능하다). 또한 염증성 장질환의 가족력이나 병력은 만성 복통의 감별 진단에 서 중요하다."},
          {id:"5-2-1-4",pts:5,en:"Item 4. Medication and Allergy Review: Confirms current medication use (specifically recent analgesics or antibiotics masking symptoms) and allergies.",ko:"항목 4. 약물 및 알레르기 확인: 현재 복용 중인 약물(특히 최근 복용한 진통제나 항생 제)과 약물 알레르기 여부를 확인한다.",xEn:"Essential for preoperative planning. If the patient has taken high-dose ibuprofen, fever and pain severity may be artificially blunted.",xKo:"수술 전 계획 수립에 필수적인 정보이다. 예를 들어 고용량 이부프로펜을 복용한 경우 발열이나 통증의 정도가 실제보다 완화되어 보일 수 있다."},
          {id:"5-2-1-5",pts:10,en:"Item 5. Review of Systems (General): Screens for extra-abdominal causes of pain, such as respiratory symptoms (lower lobe pneumonia), sore throat (mesenteric adenitis/strep), or flank pain (pyelonephritis).",ko:"항목 5. 계통별 문진(일반): 호흡기 증상(하엽 폐렴), 인후통(장간막 림프절염/연쇄상구 균 감염), 옆구리 통증(신우신염) 등 복부 외 원인에 대한 증상을 확인한다.",xEn:"\"Abdominal pain\" is a common presentation for pneumonia or strep throat in pediatrics. A broad review prevents \"anchoring bias\" on the appendix before the full picture is seen.",xKo:"소아에서는 폐렴이나 연쇄상구균 인후염이 복통으로 나타나는 경우가 흔하다. 폭 넓은 계통별 문진은 충수염에만 초점을 맞추는 “앵커링 편향(anchoring bias)“을 방지 하고 전체 임상 상황을 파악하는 데 도움이 된다."},
        ],
        d2:[
          {id:"5-2-2-6",pts:15,en:"Item 6. The \"Appendicitis Sequence\" (Anorexia/Nausea/Pain): Specifically asks about the order of symptoms. Did the pain come first, followed by vomiting? Is the patient hungry (hamburger sign)?",ko:"항목 6. “충수염 증상 순서” 확인 (식욕부진/오심/통증): 증상이 발생한 순서를 구체적 으로 질문한다. 통증이 먼저 발생한 후 구토가 나타났는지 확인하고, 환자가 식욕이 있 는지 여부(“햄버거 사인”)도 질문한다.",xEn:"In appendicitis, pain almost always precedes vomiting. If vomiting started before pain, gastroenteritis is more likely. The presence of true anorexia (refusal of favorite foods) is one of the most sensitive historical markers for appendicitis in children.",xKo:"충수염에서는 거의 항상 통증이 구토보다 먼저 발생한다. 만약 구토가 통증보다 먼저 시작되었다면 위장염일 가능성이 더 높다. 또한 실제 식욕부진(평소 좋아하는 음식 도 먹지 않으려는 상태)은 소아 충수염에서 가장 민감도가 높은 병력 소견 중 하나이다."},
          {id:"5-2-2-7",pts:10,en:"Item 7. Historical Assessment of Peritoneal Irritation: Asks if the pain is worse with movement, coughing, or \"bumps in the car\" on the ride to the ED.",ko:"항목 7. 병력을 통한 복막 자극 평가: 움직이거나 기침할 때 통증이 악화되는지, 병원으 로 오는 차 안에서 도로의 “요철(차의 흔들림)” 때문에 통증이 심해졌는지 질문한다.",xEn:"This allows the clinician to assess for peritonitis historically before touching the patient. A child who prefers to lie perfectly still likely has a surgical abdomen, whereas a child writhing in pain likely has colic (renal/biliary).",xKo:"이는 신체 검진 전에 병력만으로 복막염 가능성을 평가할 수 있게 해준다. 가만히 움직이지 않고 누워 있으려는 아이는 외과적 복부 질환일 가능성이 높고, 반대로 몸을 뒤척이며 통증을 호소하는 아이는 산통(신장결석이나 담도 산통 등)일 가능성이 더 높 다."},
          {id:"5-2-2-8",pts:20,en:"Item 8. Gynecologic and Menstrual History: Detailed inquiry (in private) regarding Last Menstrual Period (LMP), regularity of cycles, vaginal discharge, and sexual activity.",ko:"항목 8. 부인과 및 월경 병력 확인: 마지막 월경 시기(LMP), 월경 주기의 규칙성, 질 분 비물 여부, 성관계 여부에 대해 개인 면담을 통해 상세히 질문한다.",xEn:"This is the highest-weighted item in this domain. In a 12-yearold female, the differential for RLQ pain includes Ovarian Torsion, Ruptured Ovarian Cyst, PID, and Ectopic Pregnancy. Missing a torsion or ectopic pregnancy can lead to loss of organ or life. One cannot assume a 12-year-old is not sexually active based on parental report.",xKo:"이 영역에서 가장 높은 가중치를 가지는 항목이다. 12세 여성에서 우하복부 통증 의 감별 진단에는 난소 염전, 난소 낭종 파열, 골반염(PID), 자궁외 임신 등이 포함된다. 난소 염전이나 자궁외 임신을 놓칠 경우 장기 손실 또는 생명을 위협하는 결과로 이어질 수 있다. 따라서 부모의 보고만으로 성관계 여부를 판단해서는 안 되며, 반드시 환자와 의 개인적인 면담을 통해 확인해야 한다."},
          {id:"5-2-2-9",pts:10,en:"Item 9. Differentiation of Gastrointestinal Mimics: Asks about diarrhea, constipation, and dietary intake.",ko:"항목 9. 위장관 질환과의 감별: 설사, 변비, 최근 식이 섭취 여부에 대해 질문한다.",xEn:"Differentiating appendicitis from infectious enteritis (which usually features diarrhea) or severe constipation is essential. However, the candidate must know that pelvic appendicitis can cause diarrhea due to irritation of the sigmoid colon.",xKo:"충수염을 감염성 장염(대개 설사를 동반)이나 심한 변비와 감별하는 것은 중요하 다. 다만, 골반 위치의 충수염에서는 S자 결장을 자극하여 설사가 나타날 수도 있음을 알고 있어야 한다."},
          {id:"5-2-2-10",pts:5,en:"Item 10. Urinary Symptom Screen: Inquiries about dysuria, urgency, frequency, or gross hematuria.",ko:"항목 10. 비뇨기 증상 선별: 배뇨통, 요절박, 빈뇨, 육안적 혈뇨 여부를 확인한다.",xEn:"A UTI or kidney stone can mimic appendicitis. However, a retrocecal appendix can also irritate the ureter causing microscopic hematuria/pyuria. The history helps interpret the inevitable urinalysis results.",xKo:"요로감염이나 신장결석은 충수염과 유사한 증상을 보일 수 있다. 그러나 후맹장 위치(retrocecal)의 충수는 요관을 자극하여 미세 혈뇨나 농뇨가 나타날 수도 있다. 따 라서 병력 청취는 이후 시행되는 소변 검사 결과를 해석하는 데 중요한 단서를 제공합니다."},
        ],
      },
      {
        id:"5-3", label_en:"Rubric 3", label_ko:"기준표 3", d1pts:34, d2pts:66,
        threshold_en:"", threshold_ko:"",
        rationale_en:"Design Rationale for Domain Weighting: Domain 2 is weighted most heavily (66/34) because the diagnosis of appendicitis is fundamentally a clinical-historical diagnosis that is subsequently confirmed by imaging. The pain migration pattern, the sequence of associated symptoms, and the peritoneal irritation features together constitute a classical diagnostic narrative. Domain 1 retains meaningful weight because NPO status and allergy history have immediate operative implications.",
        rationale_ko:"영역 가중치 설계 근거: 영역 2가 가장 높은 비중(66/34)을 차지하는 이유는 충수염의 진단이 본질적으로 임상 병력에 기반한 진단이며, 이후 영상 검사를 통해 확인되는 구조이기 때문이다. 통증의 이동 양상, 동반 증상의 발생 순서, 복막 자극을 시사하는 병력은 함께 결합되어 고전적인 진단적 서사를 형성한다.",
        d1desc_en:"This domain evaluates the candidate's ability to conduct a comprehensive general clinical history for an adolescent with acute abdominal pain. NPO status and allergy history have immediate operative implications.",
        d1desc_ko:"이 영역은 급성 복통이 있는 청소년에 대해 포괄적인 일반 임상 병력을 청취하는 능력을 평가합니다. 금식 상태와 알레르기 병력은 즉각적인 수술 처치에 영향을 미칩니다.",
        d2desc_en:"This domain evaluates case-specific diagnostic history for acute appendicitis and gynecological differential diagnoses (66 points).",
        d2desc_ko:"이 영역은 급성 충수염 및 부인과 감별 진단에 대한 사례 특이적 진단 병력을 평가합니다 (66점).",
        d1:[
          {id:"5-3-1-1",pts:8,en:"Item 1. Presenting Complaint Characterization: Systematic exploration of abdominal pain including onset, location, character (sharp, dull, crampy), severity (pain scale), duration, progression, radiation, and aggravating/relieving factors; similar characterization of associated nausea and vomiting.",ko:"항목 1. 주증상 특성화: 복통의 발생 시점, 위치, 성질(날카로운 통증, 둔한 통증, 경련성 통증), 강도(통증 척도), 지속 시간, 진행 양상, 방사 여부, 악화 및 완화 요인을 체계적으 로 확인하며, 동반된 오심과 구토에 대해서도 동일하게 특성을 평가한다.",xEn:"Abdominal pain characterization is the diagnostic backbone of this case. The classic appendicitis narrative — periumbilical visceral pain evolving to somatic RLQ pain — emerges only through meticulous questioning about migration, timing, and quality. In an adolescent who can articulate pain characteristics, the clinician has an opportunity to obtain high-fidelity data, and the quality of this questioning directly determines diagnostic confidence. Highest weighting in Domain 1 reflects foundational importance.",xKo:"복통의 특성 파악은 이 증례에서 진단의 핵심 기반이 된다. 충수염의 전형적인 임상 경과—배꼽 주위의 내장성 통증이 이후 체성 통증으로 변하며 우하복부 통증으로 이 동하는 양상—은 통증의 이동, 시간적 경과, 통증의 성질에 대한 세밀한 질문을 통해서 만 드러난다. 통증의 특징을 명확히 표현할 수 있는 청소년 환자에서는 이러한 정보를 높은 정확도로 얻을 수 있으며, 이러한 질문의 질이 곧 진단 확신도의 수준을 결정한다. 따라서 영역 1에서 가장 높은 가중치를 부여하였다."},
          {id:"5-3-1-2",pts:4,en:"Item 2. Past Medical History: Prior abdominal surgeries, chronic GI conditions (IBD, recurrent abdominal pain), prior similar episodes, prior imaging of the abdomen, and hospitalizations.",ko:"항목 2. 과거 병력: 이전 복부 수술력, 만성 위장관 질환(염증성 장질환, 반복되는 복 통), 유사한 증상의 과거 발생 여부, 과거 복부 영상 검사 시행 여부, 이전 입원 병력을 확인한다. — 4점 Disagree 비동의",xEn:"Prior appendectomy obviously excludes the diagnosis. History of inflammatory bowel disease or recurrent abdominal pain alters the differential and may explain the presentation alternatively. Prior abdominal surgery raises concern for adhesive disease. Standard but directly relevant in any acute abdomen presentation.",xKo:"이전 충수절제술을 받은 경우 충수염 진단은 배제된다. 염증성 장질환이나 반복되 는 복통의 병력이 있는 경우 감별 진단이 달라질 수 있으며 현재 증상을 다른 원인으로 설명할 수 있다. 또한 과거 복부 수술력은 유착성 장질환 가능성을 시사할 수 있다. 이러 한 항목은 급성 복증 평가에서 기본적이면서도 직접적으로 관련된 병력이다."},
          {id:"5-3-1-3",pts:4,en:"Item 3. Medication and Allergy History: Current medications (particularly NSAIDs, oral contraceptives, antibiotics), recent analgesic use (what, when, and whether it altered the pain), and drug allergies with reaction type.",ko:"항목 3. 약물 및 알레르기 병력: 현재 복용 중인 약물(특히 NSAIDs, 경구 피임약, 항생 제), 최근 진통제 사용 여부(무엇을 언제 복용했는지, 통증에 영향을 주었는지), 약물 알 레르기와 그 반응 유형을 확인한다.",xEn:"Analgesic history is practically important — knowing what has been tried and whether pain persisted despite treatment provides indirect severity data. Oral contraceptive use is relevant to the gynecological differential. Allergy documentation is a pre-operative safety requirement, as this child may proceed to appendectomy. Moderate weighting reflects practical and safety value.",xKo:"진통제 사용 병력은 실질적으로 중요하다. 어떤 약물을 시도했는지, 그리고 치료 후에도 통증이 지속되었는지를 아는 것은 간접적으로 통증의 중증도를 판단하는 데 도 움이 된다. 경구 피임약 사용 여부는 부인과적 감별 진단과 관련된다. 또한 알레르기 병력 기록은 이 환자가 충수절제술로 진행할 가능성이 있기 때문에 수술 전 안전을 위해 필수적이다. 이러한 이유로 실무적 및 안전상의 중요성을 반영하여 중간 수준의 가중치 를 부여하였다."},
          {id:"5-3-1-4",pts:2,en:"Item 4. Immunization History: Confirmation of up-to-date vaccination status.",ko:"항목 4. 예방접종 병력: 예방접종이 최신 상태로 유지되고 있는지 확인한다.",xEn:"Minimally relevant to the acute presentation but remains a standard pediatric history element. Low weighting reflects limited casespecific impact.",xKo:"급성 복통의 현재 임상 상황과 직접적인 관련성은 낮지만, 소아 병력 청취에서 표 준적으로 확인해야 하는 항목이다. 이 증례에서는 사례 특이적 영향이 제한적이므로 낮 은 가중치를 부여하였다."},
          {id:"5-3-1-5",pts:4,en:"Item 5. Social and Family History: Family history of IBD, familial Mediterranean fever, or other hereditary causes of abdominal pain; household context; school impact; and for an adolescent, confidential social history (see Domain 2).",ko:"항목 5. 사회력 및 가족력: 염증성 장질환(IBD), 가족성 지중해열(FMF) 등 복통을 유 발할 수 있는 유전 질환의 가족력, 가정 환경, 학교 생활에 미치는 영향, 그리고 청소년 환자에서의 비밀 보장이 필요한 사회력(영역 2에서 추가 평가)을 확인한다.",xEn:"Family history of IBD or FMF may suggest alternative diagnoses presenting similarly. Household context informs post-operative recovery planning. The social history in an adolescent also sets up the confidential history-taking in Domain 2. Moderate weighting reflects combined relevance.",xKo:"IBD나 FMF의 가족력이 있는 경우 유사한 증상으로 나타날 수 있는 다른 진단을 시사할 수 있다. 가정 환경은 수술 후 회복 및 돌봄 계획을 세우는 데 도움이 된다. 또한 청소년 환자의 사회력은 영역 2에서 진행될 비밀 보장 하의 병력 청취를 준비하는 과정 이기도 하다. 이러한 복합적인 임상적 관련성을 반영하여 중간 수준의 가중치를 부여하 였다."},
          {id:"5-3-1-6",pts:4,en:"Item 6. Review of Systems: Structured screening beyond the GI presentation — respiratory symptoms (right lower lobe pneumonia can cause referred RLQ pain), urinary symptoms, musculoskeletal complaints, and systemic symptoms (weight loss, night sweats suggesting chronic pathology).",ko:"항목 6. 계통별 문진(Review of Systems): 위장관 증상 외에도 호흡기 증상(우하엽 폐렴은 우하복부로 연관통을 유발할 수 있음), 비뇨기 증상, 근골격계 증상, 전신 증상 (체중 감소, 야간 발한 등 만성 질환을 시사하는 증상)을 체계적으로 확인한다.",xEn:"The review of systems is a critical safety net for the acute abdomen. Right lower lobe pneumonia, urinary tract infection, and musculoskeletal pathology can all mimic RLQ pain. Screening for weight loss, chronic diarrhea, or mouth ulcers may reveal undiagnosed IBD presenting acutely. This element protects against premature diagnostic closure.",xKo:"계통별 문진은 급성 복증 평가에서 중요한 안전 장치 역할을 한다. 우하엽 폐렴, 요로감염, 근골격계 질환 등은 모두 우하복부 통증과 유사하게 나타날 수 있다. 또한 체중 감소, 만성 설사, 구강 궤양과 같은 증상은 급성으로 나타난 미진단 염증성 장질환 (IBD)을 시사할 수 있다. 이러한 문진은 진단을 성급하게 단정하는 오류를 방지하는 데 중요한 역할을 한다."},
          {id:"5-3-1-7",pts:5,en:"Item 7. Oral Intake and Last Meal Timing (NPO Status): When the patient last ate or drank, type and amount of last intake.",ko:"항목 7. 경구 섭취 및 마지막 식사 시간(NPO 상태): 환자가 마지막으로 음식이나 음료 를 섭취한 시간, 섭취한 음식의 종류와 양을 확인한다.",xEn:"This receives elevated weighting because it has immediate surgical relevance. If appendectomy is indicated, anesthetic planning depends on NPO status. In the emergency setting, this question is frequently omitted or asked late, yet it directly affects the timing and safety of operative intervention. Including this in the general domain reflects its universal importance in any potential surgical abdomen.",xKo:"이 항목은 즉각적인 수술적 의사결정과 관련되기 때문에 비교적 높은 가중치를 부 여하였다. 충수절제술이 필요한 경우 마취 계획은 환자의 금식(NPO) 상태에 크게 의존 한다. 응급 상황에서는 이 질문이 종종 누락되거나 늦게 확인되는 경우가 있으나, 실제 로는 수술 시점과 마취 안전성에 직접적인 영향을 미친다. 잠재적인 수술적 복증 환자에 서 보편적으로 중요한 요소이므로 일반 영역에 포함하였다."},
          {id:"5-3-1-8",pts:3,en:"Item 8. Structured and Organized Approach: History obtained in a logical sequence, demonstrates clinical reasoning, and reflects appropriate urgency for a potential surgical abdomen.",ko:"항목 8. 체계적이고 조직적인 접근: 병력을 논리적인 순서로 청취하며, 임상적 추론을 보여주고 잠재적인 외과적 복증에 적절한 긴급성을 반영한다.",xEn:"An efficient, focused history that prioritizes pain characterization, surgical red flags, and operative readiness (NPO status, allergies) reflects emergency-appropriate prioritization. The trainee should demonstrate awareness that this is a time-sensitive presentation while maintaining thoroughness.",xKo:"통증 특성, 외과적 위험 신호, 수술 준비 요소(NPO 상태, 알레르기 등)를 우선적 으로 확인하는 효율적이고 집중된 병력 청취는 응급 상황에 적합한 우선순위 설정을 보 여준다. 수련의는 이 상황이 시간 민감적인 임상 상황임을 인지하면서도 충분한 정보를 체계적으로 수집해야 한다."},
        ],
        d2:[
          {id:"5-3-2-9",pts:12,en:"Item 9. Pain Migration Pattern: Explicit questioning about where the pain started, whether and how it moved, the timeline of migration, and the current location of maximal pain.",ko:"항목 9. 통증 이동 양상: 통증이 처음 시작된 위치, 통증이 이동했는지 여부와 이동 방 식, 이동의 시간적 경과, 그리고 현재 통증이 가장 심한 위치에 대해 명확히 질문한다.",xEn:"The migration from periumbilical to RLQ pain is the single most diagnostically powerful historical feature for appendicitis. This classic pattern — reflecting the transition from visceral (midgut stretch) to somatic (parietal peritoneal irritation) pain — has high positive predictive value when elicited clearly. Many patients will not volunteer migration spontaneously; the clinician must ask directed questions such as \"where did you first feel the pain?\" and \"has it moved?\" This receives the highest individual weighting because no other single historical element contributes as much to the diagnostic probability of appendicitis.",xKo:"배꼽 주위 통증이 우하복부(RLQ)로 이동하는 양상은 충수염에서 가장 진단적 가 치가 높은 병력 요소이다. 이전형적인 패턴은 내장성 통증(중장관의 팽창으로 인한 통증)에서 체성 통증(벽측 복막 자극)으로 변화하는 병태생리를 반영하며, 명확히 확인될 경우 높은 양성 예측도를 가진다. 많은 환자들은 통증 이동을 자발적으로 언급하지 않기 때문에, 임상의는 “처음 어디에서 통증을 느꼈나요?” 또는 “통증 위치가 이동했나 요?”와 같은 직접적인 질문을 해야 한다. 충수염 진단 확률에 가장 크게 기여하는 단일 병력 요소이므로 가장 높은 개별 가중치를 부여하였다."},
          {id:"5-3-2-10",pts:8,en:"Item 10. Peritoneal Irritation Symptoms: Inquiry into whether pain worsens with movement, walking, coughing, going over bumps in the car, or jumping; whether the patient prefers to lie still; and whether there is pain on the right side when pressing on the left abdomen (history-level Rovsing equivalent).",ko:"항목 10. 복막 자극 증상: 움직임, 보행, 기침, 차량 이동 중의 흔들림(도로의 요철), 점 프 시 통증이 악화되는지 여부를 확인하고, 환자가 움직이지 않고 가만히 누워 있으려 하는지, 그리고 좌측 복부를 눌렀을 때 우측에서 통증이 느껴지는지(병력 수준의 Rovsing 징후에 해당) 질문한다.",xEn:"History-elicited peritoneal signs substantially increase the pre-test probability of appendicitis before the physical examination even begins. A child who reports pain worsening with every bump in the car or who walks hunched and slowly into the emergency department is providing high-value diagnostic data. These questions also help distinguish appendicitis from medical causes of RLQ pain (mesenteric adenitis, gastroenteritis) that typically do not produce such movement-sensitive pain.",xKo:"병력 청취를 통해 확인되는 복막 자극 징후는 신체검사를 시작하기 전부터 충수염 의 사전 확률을 상당히 높인다. 차량 이동 중 작은 충격마다 통증이 심해졌다고 말하거 나 응급실에 몸을 구부리고 천천히 걸어 들어오는 환자는 이미 매우 중요한 진단 정보를 제공하고 있는 것이다. 이러한 질문은 또한 충수염과 RLQ 통증을 유발하는 내과적 원인(예: 장간막 림프절염, 위장관염)을 구별하는 데 도움이 되는데, 이러한 질환들은 일반 적으로 움직임에 따라 악화되는 통증을 보이지 않는 경우가 많다."},
          {id:"5-3-2-11",pts:8,en:"Item 11. Associated GI Symptoms — Sequence and Character: Detailed inquiry into anorexia (onset relative to pain), nausea, vomiting (number of episodes, bilious vs. non-bilious, onset relative to pain), diarrhea, constipation, and change in bowel habits.",ko:"항목 11. 동반 위장관 증상 — 발생 순서와 특성: 식욕부진(통증과의 발생 순서), 오심, 구토(횟수, 담즙성 여부, 통증과의 발생 순서), 설사, 변비, 배변 습관의 변화에 대해 상 세히 질문한다.",xEn:"The classic appendicitis sequence — anorexia preceding pain, followed by nausea and then vomiting — is a well-established historical feature. The absence of anorexia makes appendicitis less likely. Bilious vomiting raises concern for obstruction. Diarrhea may suggest gastroenteritis as an alternative or indicate a pelvic appendix irritating the rectum. The order of symptom onset relative to pain is diagnostically valuable and must be explicitly elicited. High weighting reflects direct diagnostic contribution.",xKo:"충수염에서 흔히 나타나는 전형적인 증상 진행은 식욕부진 → 통증 → 오심 → 구토 의 순서로 알려져 있다. 식욕부진이 없는 경우 충수염 가능성은 낮아진다. 담즙성 구토 는 장 폐색을 시사할 수 있다. 설사는 위장관염을 시사하는 대안 진단일 수 있으며, 직장 을 자극하는 골반 위치의 충수에서 나타날 수도 있다. 특히 통증과 각 증상의 발생 순서 는 진단적으로 중요한 단서가 되므로 반드시 명확히 확인해야 한다. 이러한 요소가 진단 에 직접적으로 기여하기 때문에 높은 가중치를 부여하였다."},
          {id:"5-3-2-12",pts:10,en:"Item 12. Gynecological and Menstrual History (Confidential Adolescent History): Last menstrual period, regularity, dysmenorrhea, sexual activity, contraceptive use, possibility of pregnancy, vaginal discharge, and history of ovarian cysts or gynecological conditions.",ko:"항목 12. 부인과 및 월경 병력(비밀 보장이 필요한 청소년 병력): 마지막 월경 시기 (LMP), 월경 주기의 규칙성, 월경통 여부, 성적 활동 여부, 피임 방법 사용 여부, 임신 가능성, 질 분비물, 난소 낭종 또는 기타 부인과 질환 병력을 확인한다.",xEn:"This receives very high weighting because in an adolescent girl with RLQ pain, the gynecological differential is extensive and includes ectopic pregnancy (life-threatening), ovarian torsion (surgical emergency), ruptured ovarian cyst, and pelvic inflammatory disease — all of which can closely mimic appendicitis. Failure to obtain a menstrual and sexual history is a critical safety gap. This history should be obtained confidentially (without parents present) to ensure honest disclosure. The negative β-hCG in this case does not negate the need to ask — the clinician must have the clinical reasoning to order that test, which depends on having asked about sexual activity and LMP.",xKo:"청소년 여성에서 우하복부 통증이 있는 경우 부인과적 감별 진단의 범위가 매우 넓기 때문에 이 항목은 높은 가중치를 가진다. 감별 진단에는 자궁외임신(생명을 위협할 수 있음), 난소 염전(외과적 응급상황), 난소 낭종 파열, 골반염(PID) 등이 포함되며, 이 들은 모두 충수염과 매우 유사한 임상 양상을 보일 수 있다. 월경 및 성생활 병력을 확인 하지 않는 것은 환자 안전 측면에서 중대한 누락이다. 이러한 병력은 부모가 없는 상태 에서 비밀 보장이 이루어지는 환경에서 질문해야 환자가 솔직하게 답할 수 있다. 또한 본 증례에서 β-hCG가 음성이라고 하더라도 이러한 질문의 필요성이사라지는 것은 아 니다. 임상의가 성적 활동과 LMP에 대해 먼저 확인해야만 임신 검사 시행에 대한 임상 적 판단이 가능하기 때문이다."},
          {id:"5-3-2-13",pts:5,en:"Item 13. Fever Pattern and Systemic Illness Assessment: Onset and height of fever, relationship to pain onset, response to antipyretics, rigors, and overall trajectory of the child's condition (improving, stable, or worsening).",ko:"항목 13. 발열 양상 및 전신 질환 평가: 발열의 시작 시점과 최고 체온, 통증 발생과의 시간적 관계, 해열제에 대한 반응, 오한(떨림) 여부, 그리고 전반적인 상태 변화(호전, 변화 없음, 악화)를 확인한다.",xEn:"In appendicitis, low-grade fever typically develops after pain onset. High fever (>39°C) early in the course raises concern for perforation or alternative diagnosis (pyelonephritis, pelvic abscess). Fever preceding pain by days suggests a medical rather than surgical etiology. The trajectory of systemic illness helps gauge urgency — a child who is progressively worsening over hours needs expedited surgical evaluation.",xKo:"충수염에서는 일반적으로 통증 발생 이후에 저등급 발열이 나타난다. 질병 초기에 고열(>39°C)이 나타나는 경우 천공, 또는 다른 질환(신우신염, 골반 농양 등)을 의심해 야 한다. 또한 발열이 며칠 먼저 나타난 후 통증이 발생한 경우 외과적 원인보다는 내과 적 질환 가능성이 높다. 전신 상태의 변화 양상 역시 중요하다. 몇 시간 사이에 점차 악화되는 환자는 신속한 외과적 평가가 필요할 수 있다."},
          {id:"5-3-2-14",pts:7,en:"Item 14. Differential Diagnosis–Oriented Questioning: Targeted questions to exclude mesenteric adenitis (preceding viral illness, diffuse tenderness), gastroenteritis (prominent diarrhea, sick contacts), urinary tract pathology (dysuria, frequency, flank pain), right lower lobe pneumonia (cough, pleuritic pain), and inflammatory bowel disease (chronic diarrhea, blood in stool, weight loss, joint symptoms, mouth ulcers).",ko:"항목 14. 감별 진단 중심 질문: 장간막 림프절염(선행 바이러스 감염, 광범위한 압통), 위장관염(뚜렷한 설사, 아픈 접촉자), 요로 질환(배뇨통, 빈뇨, 옆구리 통증), 우하엽 폐 렴(기침, 흉막성 통증), 염증성 장질환(만성 설사, 혈변, 체중 감소, 관절 증상, 구강 궤 양)을 배제하기 위한 표적 질문을 시행한다.",xEn:"The RLQ in an adolescent has one of the broadest surgical and medical differentials in pediatric emergency medicine. A competent clinician actively seeks or excludes features of each alternative diagnosis through targeted questioning rather than simply confirming the appendicitis narrative. Particular attention to a preceding viral illness (suggesting mesenteric adenitis, the most common mimic), urinary symptoms, and chronic GI complaints reflects thorough clinical reasoning. Substantial weighting reflects the breadth and importance of the differential.",xKo:"청소년의 우하복부(RLQ) 통증은 소아 응급의학에서 가장 폭넓은 외과적·내과적 감별 진단을 가진다. 유능한 임상의는 단순히 충수염의 전형적 서사를 확인하는 데 그치 지 않고, 각 대체 진단의 특징적 증상을 표적 질문을 통해 적극적으로 탐색하거나 배제 한다. 특히 선행 바이러스 감염(장간막 림프절염 시사), 비뇨기 증상, 만성 위장관 증상 에 대한 확인은 철저한 임상 추론을 보여준다. 감별 진단의 범위와 임상적 중요성을 반 영하여 비교적 높은 가중치를 부여하였다."},
          {id:"5-3-2-15",pts:6,en:"Item 15. Complications and Severity Indicators: Questions about duration of symptoms before presentation, increasing pain severity, diffuse (rather than localized) abdominal pain suggesting generalized peritonitis, rigors, and any episode of transient pain improvement followed by worsening (suggesting perforation).",ko:"항목 15. 합병증 및 중증도 지표: 병원 방문 전 증상의 지속 기간, 통증 강도의 증가 여 부, 국소 통증이 아닌 전반적인 복부 통증(전반적 복막염 시사), 오한(떨림), 그리고 일시 적인 통증 호전 후 다시 악화된 에피소드(천공 시사)에 대해 질문한다.",xEn:"Identifying features suggestive of complicated appendicitis (perforation, abscess) is important because it may alter the surgical approach (immediate operative vs. interval appendectomy after percutaneous drainage) and the urgency of intervention. A classic but often- missed historical clue is transient pain improvement followed by diffuse worsening, suggesting appendiceal rupture with temporary decompression followed by generalized peritonitis. Duration of symptoms >48 hours increases perforation risk. This reflects advanced clinical reasoning.",xKo:"천공이나 농양과 같은 복잡성 충수염을 시사하는 특징을 확인하는 것은 중요하다. 이는 수술 접근 방식(즉시 수술 vs. 경피적 배액 후 간격 충수절제술)과 처치의 긴급도를 결정하는 데 영향을 줄 수 있기 때문이다. 종종 간과되는 전형적인 병력 단서는 일시적 인 통증 호전 후 전반적인 통증 악화로, 이는 충수가 파열되며 일시적으로 압력이 감소 했다가 이후 전신 복막염으로 진행하는 상황을 시사한다. 또한 증상 지속 시간이 48시 간을 초과할 경우 천공 위험이 증가한다. 이러한 질문은 보다 높은 수준의 임상적 추론 능력을 반영한다."},
          {id:"5-3-2-16",pts:5,en:"Item 16. Surgical and Anesthetic Readiness Assessment: Last oral intake (food and clear fluids separately, with timing), prior anesthetic history or complications, family history of anesthetic complications (malignant hyperthermia), and patient/family understanding that surgery may be needed.",ko:"항목 16. 수술 및 마취 준비 평가: 마지막 경구 섭취 시점(고형 음식과 맑은 액체를 구 분하여 시간 확인), 이전 마취 경험이나 합병증 여부, 가족 내 마취 관련 합병증 병력(악 성 고열증), 그리고 환자와 보호자가 수술이 필요할 가능성을 이해하고 있는지 확인합니다.",xEn:"This is a practical but frequently under-assessed element. In a probable surgical case, the history-taker should proactively gather information needed for anesthetic planning. NPO timing determines whether the case can proceed urgently or requires a waiting period. Family history of malignant hyperthermia, though rare, is a critical anesthetic safety question. Beginning the conversation about possible surgery early reflects excellent anticipatory clinical practice.",xKo:"이는 실무적으로 중요하지만 자주 간과되는 요소이다. 수술 가능성이 높은 경우 병력 청취 단계에서 마취 계획에 필요한 정보를 선제적으로 확인해야 한다. 금식(NPO) 시간은 수술을 즉시 진행할 수 있는지 아니면 일정 시간 대기해야 하는지를 결정한다. 또한 악성 고열증과 같은 가족력은 드물지만 마취 안전에 있어 매우 중요한 질문이다. 수술 가능성에 대해 조기에 대화를 시작하는 것은 우수한 선제적 임상 접근을 반영한다."},
          {id:"5-3-2-17",pts:5,en:"Item 17. Prior Episodes and Chronicity Assessment: Whether the patient has experienced similar pain episodes before (suggesting recurrent appendicitis, chronic appendicitis, or an alternative chronic diagnosis such as IBD or functional abdominal pain), and whether there has been any preceding weight loss or growth deceleration.",ko:"항목 17. 이전 에피소드 및 만성 경과 평가: 과거에 유사한 복통 에피소드가 있었는지 (재발성 충수염, 만성 충수염, 또는 염증성 장질환(IBD)이나 기능성 복통과 같은 다른 만성 질환 가능성 시사), 그리고 체중 감소나 성장 속도 저하가 있었는지 확인한다.",xEn:"Recurrent RLQ pain episodes may suggest smoldering appendiceal inflammation or, alternatively, an inflammatory or functional etiology misdiagnosed as recurrent appendicitis. Weight loss or growth deceleration in an adolescent with acute abdominal pain should trigger consideration of IBD, even if the acute presentation appears surgical. Asking about prior episodes also protects against the assumption that a first presentation must be a new disease when it may represent an acute exacerbation of an undiagnosed chronic condition.",xKo:"반복적인 우하복부 통증 에피소드는 지속적인 충수 염증을 시사할 수 있으며, 또 는 반복되는 충수염으로 오진된 염증성 또는 기능성 질환일 가능성도 있다. 또한 급성 복통을 호소하는 청소년에서 체중 감소나 성장 지연이 있다면, 임상 양상이 외과적 질환 처럼 보이더라도 IBD 가능성을 반드시 고려해야 한다. 이전 에피소드에 대해 질문하는 것은 이번 증상이 완전히 새로운 질환인지, 아니면 진단되지 않은 만성 질환의 급성 악화인지 구별하는 데 도움이 된다."},
        ],
      },
      {
        id:"5-4", label_en:"Rubric 4", label_ko:"기준표 4", d1pts:50, d2pts:50,
        threshold_en:"", threshold_ko:"",
        rationale_en:"", rationale_ko:"",
        d1desc_en:"This domain evaluates core history-taking skills applicable across all pediatric emergency presentations.",
        d1desc_ko:"이 영역은 모든 소아 응급 상황에 적용 가능한 핵심 병력 청취 기술을 평가합니다.",
        d2desc_en:"This domain evaluates case-specific diagnostic history for acute appendicitis in an adolescent.",
        d2desc_ko:"이 영역은 청소년에서 급성 충수염에 대한 사례 특이적 진단 병력을 평가합니다.",
        d1:[
          {id:"5-4-1-1",pts:5,en:"Item 1. Chief Complaint: Clearly elicits and articulates the primary presenting problem(s) in patient's/family's own words.",ko:"항목 1. 주호소(Chief Complaint): 환자 또는 보호자의 표현을 바탕으로 주요 증상 을 명확히 확인하고 정리한다.",xEn:"Establishes encounter focus; foundational and routinely expected, modest weight.",xKo:"진료의 초점을 설정하는 기본 단계로, 모든 임상 면담에서 필수적으로 수행되어야 한다. 기초적이지만 중요한 요소이므로 비교적 낮은 가중치를 부여하였다."},
          {id:"5-4-1-2",pts:12,en:"Item 2. History of Presenting Illness: Systematically explores onset, timing, duration, severity, progression, aggravating/alleviating factors, and associated symptoms using a structured approach (e.g., OPQRST).",ko:"항목 2. 현병력(History of Presenting Illness): OPQRST와 같은 구조화된 접근 을 사용하여 증상의 시작 시점, 발생 시기, 지속 시간, 중증도, 진행 양상, 악화/완화 요인, 동반 증상을 체계적으로 탐색한다.",xEn:"Captures illness trajectory for urgency in pediatric EM; core to all differentials, highest general weight.",xKo:"소아 응급의학에서 질병의 경과와 긴급도를 파악하는 데 핵심적인 요소이며, 모든 감별 진단의 기초가 된다. 일반 병력 영역에서 가장 중요한 항목이므로 가장 높은 가중 치를 부여하였다."},
          {id:"5-4-1-3",pts:7,en:"Item 3. Past Medical History: Inquires about chronic illnesses, prior hospitalizations, surgeries, birth/developmental history, and previous similar episodes.",ko:"항목 3. 과거 병력(Past Medical History): 만성 질환, 이전 입원 및 수술 병력, 출 생 및 발달 병력, 그리고 이전에 유사한 증상이 있었는지 여부를 확인한다.",xEn:"Identifies risks or patterns affecting management; moderate for baseline stratification.",xKo:"치료 계획에 영향을 줄 수 있는 위험 요인이나 질병의 패턴을 파악하는 데 도움이 되며, 환자의 기본 상태를 평가하는 데 중요하다. 기초적인 위험도 층화를 위해 중간 수 준의 가중치를 부여하였다."},
          {id:"5-4-1-4",pts:4,en:"Item 4. Medications: Documents current prescriptions, over-the-counter drugs, recent antibiotics, and adherence.",ko:"항목 4. 복용 약물(Medications): 현재 복용 중인 처방약, 일반의약품(OTC), 최근 항생제 사용 여부, 그리고 약물 복용 순응도를 확인한다.",xEn:"Guides therapy and avoids interactions; straightforward, low weight.",xKo:"치료 계획 수립에 도움을 주고 약물 상호작용을 예방하기 위해 필요한 기본 정보 이다. 비교적 단순한 확인 항목이므로 낮은 가중치를 부여하였다."},
          {id:"5-4-1-5",pts:4,en:"Item 5. Allergies: Asks about drug/food allergies, adverse reactions, and anaphylaxis history.",ko:"항목 5. 알레르기(Allergies): 약물 및 음식 알레르기 여부, 과거 부작용 반응, 아나필 락시스 병력을 확인한다.",xEn:"Ensures prescribing safety; low weight paired with medications.",xKo:"약물 처방 시 환자 안전을 확보하기 위한 기본적인 확인 사항이다. 약물 병력과 함 께 확인되는 항목으로, 상대적으로 낮은 가중치를 부여하였다."},
          {id:"5-4-1-6",pts:4,en:"Item 6. Immunizations: Confirms status, recent vaccines, and gaps relevant to infectious risks.",ko:"항목 6. 예방접종(Immunizations): 예방접종 상태, 최근 접종 여부, 그리고 감염 위험과 관련된 접종 누락 여부를 확인한다.",xEn:"Critical in pediatrics for context; low as often documented.",xKo:"소아 진료에서 중요한 배경 정보이지만, 일반적으로 의료 기록에 이미 문서화되어 있는 경우가 많다. 이러한 이유로 낮은 가중치를 부여하였다."},
          {id:"5-4-1-7",pts:5,en:"Item 7. Family History: Explores hereditary conditions and relevant familial illnesses.",ko:"항목 7. 가족력(Family History): 유전성 질환과 임상적으로 관련될 수 있는 가족 내 질환 여부를 확인한다.",xEn:"Uncovers genetic risks; pediatric-relevant, moderate weight.",xKo:"유전적 위험 요인이나 가족 내 질환 패턴을 파악하는 데 도움이 되며, 소아 환자 평가에서 임상적으로 의미 있는 정보를 제공할 수 있다. 이러한 이유로 중간 수준의 가 중치를 부여하였다."},
          {id:"5-4-1-8",pts:4,en:"Item 8. Social History: Assesses home environment, caregivers, school/daycare/nursery exposure, and habits.",ko:"항목 8. 사회력(Social History): 가정 환경, 주 보호자, 학교/어린이집/유치원 노출, 생활 습관 등을 확인한다.",xEn:"Contextualizes adherence/exposures; supportive, low weight.",xKo:"치료 순응도나 감염 노출 가능성 등 환자의 임상 상황을 이해하는 데 도움이 되는 배경 정보를 제공한다. 보조적인 역할을 하는 항목이므로 낮은 가중치를 부여하였다."},
          {id:"5-4-1-9",pts:5,en:"Item 9. Review of Systems: Performs age-appropriate screening for unrelated symptoms.",ko:"항목 9. 계통별 문진(Review of Systems): 연령에 적절한 방식으로 현재 주증상과 직접 관련되지 않은 증상들을 선별적으로 확인한다.",xEn:"Safety net for comorbidities; moderate for comprehensiveness.",xKo:"동반 질환이나 놓칠 수 있는 다른 임상 문제를 발견하기 위한 안전 장치 역할을 한 다. 병력 청취의 포괄성을 확보하는 데 중요하므로 중간 수준의 가중치를 부여하였다."},
        ],
        d2:[
          {id:"5-4-2-10",pts:15,en:"Item 10. Abdominal Pain Characterization: Details onset (periumbilical migration), RLQ localization, quality, severity, radiation, and aggravating factors (movement, cough).",ko:"항목 10. 복통 특성 평가: 통증의 시작 시점(배꼽 주위 통증에서 시작해 이동했는지 여 부), 우하복부(RLQ) 국소화, 통증의 성질, 강도, 방사 여부, 그리고 움직임이나 기침과 같은 악화 요인을 확인한다.",xEn:"Pathognomonic progression for appendicitis; highest weight for surgical diagnosis priority.",xKo:"배꼽 주위 통증에서 시작하여 우하복부로 이동하는 양상은 충수염에서 특징적인 병력 소견이다. 이러한 전형적인 진행 양상은 외과적 진단에 매우 중요한 단서가 되므 로, 이 영역에서 가장 높은 가중치를 부여하였다."},
          {id:"5-4-2-11",pts:10,en:"Item 11. Associated GI Symptoms: Probes anorexia, nausea/vomiting (non-bilious, timing), bowel habits (diarrhea/constipation).",ko:"항목 11. 동반 위장관 증상: 식욕부진, 오심 및 구토(담즙성 여부와 발생 시점), 배변 습 관 변화(설사 또는 변비)를 확인한다.",xEn:"Quantifies obstruction/peritonitis risk; high weight refines acuity.",xKo:"이러한 증상은 장 폐색이나 복막염 위험을 평가하는 데 도움이 되며, 질환의 급성 도를 보다 정확하게 판단할 수 있게 한다. 임상적 중증도와 감별 진단을 정교화하는 데 중요한 요소이므로 높은 가중치를 부여하였다."},
          {id:"5-4-2-12",pts:8,en:"Item 12. Gynecologic History: Inquires about LMP, vaginal discharge/symptoms, dysuria, sexual activity.",ko:"항목 12. 부인과 병력(Gynecologic History): 마지막 월경 시기(LMP), 질 분비물 또는 관련 증상, 배뇨통, 성적 활동 여부를 확인한다.",xEn:"Excludes ovarian torsion/ectopic in adolescent female; substantial due to age/gender pitfalls.",xKo:"청소년 여성에서 우하복부 통증이 있을 경우 난소 염전이나 자궁외임신과 같은 부 인과적 응급 질환을 반드시 감별해야 한다. 연령과 성별로 인해 발생할 수 있는 진단 오 류를 예방하는 데 중요하므로 비교적 높은 가중치를 부여하였다."},
          {id:"5-4-2-13",pts:7,en:"Item 13. Fever Pattern: Documents onset, peaks, chills, response to antipyretics.",ko:"항목 13. 발열 양상(Fever Pattern): 발열의 시작 시점, 최고 체온, 오한 여부, 해열 제에 대한 반응을 확인한다.",xEn:"Indicates inflammation/infection; moderate for systemic involvement.",xKo:"발열 양상은 염증 또는 감염의 존재를 시사하며 전신 침범 정도를 평가하는 데 도 움이 된다. 이러한 이유로 중간 수준의 가중치를 부여하였다."},
          {id:"5-4-2-14",pts:7,en:"Item 14. Red Flag Screening: Explores peritoneal signs, hematochezia, severe unrelenting pain, urinary symptoms.",ko:"항목 14. 위험 신호 선별(Red Flag Screening): 복막 자극 징후, 혈변, 지속적이고 심한 통증, 비뇨기 증상 여부를 확인한다.",xEn:"Differentiates from perforation/Meckel's; key for imaging/surgical consult.",xKo:"천공성 충수염이나 메켈 게실과 같은 다른 심각한 질환을 감별하는 데 중요하다. 이러한 증상은 추가 영상 검사나 외과적 상담의 필요성을 판단하는 핵심 단서가 된다."},
          {id:"5-4-2-15",pts:3,en:"Item 15. Prior Abdominal History: Screens recurrent pain, constipation, surgeries, or IBD flares.",ko:"항목 15. 과거 복부 병력(Prior Abdominal History): 반복되는 복통, 변비, 이전 복부 수술, 또는 염증성 장질환(IBD) 악화 병력을 확인한다.",xEn:"Identifies chronic mimics/recurrence; lower confirmatory weight.",xKo:"만성 질환이나 반복되는 복통으로 인한 유사 증상을 감별하는 데 도움이 된다. 진단을 보조적으로 확인하는 요소이므로 비교적 낮은 가중치를 부여하였다."},
        ],
      },
    ],
  },
];