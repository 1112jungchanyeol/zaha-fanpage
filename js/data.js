const ZAHA = {
  nameKo: "윌프리드 자하",
  nameEn: "WILFRIED ZAHA",
  fullName: "Dazet Wilfried Armel Zaha",
  birth: "1992-11-10",
  birthPlace: "코트디부아르 아비장",
  height: "182cm",
  weight: "66kg",
  position: "윙어 (좌·우 모두 소화)",
  foot: "오른발 (왼쪽에서 안쪽으로 컷인)",
  nationality: "코트디부아르",
  currentClub: "갈라타사라이 (2023~2026)",
  palaceApps: 458,
  palaceGoals: 90,
  palaceLeagueGoals: 81,
  palacePLGoals: 68,
  assistsNote: "팰리스 통산 어시스트 약 57개 (집계 기관별 상이)"
};

const CAREER = [
  { years: "2000", club: "크리스탈 팰리스 유스", note: "만 8세에 입단한 크로이던 소년", type: "youth" },
  { years: "2010.03.27", club: "크리스탈 팰리스 1군 데뷔", note: "카디프 시티전 교체 투입 (17세)", type: "debut" },
  { years: "2010–2013", club: "크리스탈 팰리스 (1기)", note: "챔피언십 143경기 18골 · 2013 플레이오프 승격 주역", type: "club" },
  { years: "2013.01", club: "맨체스터 유나이티드 이적", note: "이적료 £10M~15M · 퍼거슨 감독의 마지막 영입 · 즉시 팰리스 임대 복귀", type: "transfer" },
  { years: "2013–2015", club: "맨체스터 유나이티드", note: "4경기 출전 · 커뮤니티 실드 우승 (데뷔전)", type: "club" },
  { years: "2014.01–05", club: "카디프 시티 (임대)", note: "12경기 0골", type: "loan" },
  { years: "2014.08–2015.02", club: "크리스탈 팰리스 (임대)", note: "뉴캐슬전 추가시간 동점골으로 복귀 인사", type: "loan" },
  { years: "2015.02", club: "팰리스 완전 이적", note: "약 £3M · 이후 9시즌간 팀의 심장으로", type: "transfer" },
  { years: "2015–2023", club: "크리스탈 팰리스 (2기)", note: "315경기 72골 · FA컵 준우승(2016) · 구단 PL 최다 득점자", type: "club" },
  { years: "2023.07", club: "갈라타사라이 이적", note: "자유이적 · 쉬페르리그·슈퍼컵 우승", type: "transfer" },
  { years: "2024.08–2025.01", club: "올림피크 리옹 (임대)", note: "4경기 0골 · 상호 합의로 임대 종료", type: "loan" },
  { years: "2025.01–2026.06", club: "샬럿 FC (임대, MLS)", note: "데뷔전 골 · 44경기 13골", type: "loan" }
];

const INTERNATIONAL = [
  { team: "잉글랜드 U-19", years: "2011", record: "2경기 0골" },
  { team: "잉글랜드 U-21", years: "2012–2013", record: "13경기 2골" },
  { team: "잉글랜드 성인 대표팀", years: "2012–2013", record: "2경기 0골 (평가전)" },
  { team: "코트디부아르", years: "2017–", record: "36경기 5골 · AFCON 2017/2019/2021/2025 출전" }
];

const HONORS = [
  { name: "EFL 챔피언십 플레이오프 우승", year: "2013", club: "크리스탈 팰리스" },
  { name: "FA 커뮤니티 실드 우승", year: "2013", club: "맨체스터 유나이티드" },
  { name: "FA컵 준우승", year: "2015–16", club: "크리스탈 팰리스" },
  { name: "쉬페르리그 우승", year: "2023–24", club: "갈라타사라이" },
  { name: "터키 슈퍼컵 우승", year: "2023", club: "갈라타사라이" },
  { name: "풋볼리그 영 플레이어 오브 더 이어", year: "2012", club: "개인" },
  { name: "PFA 올해의 팀 (챔피언십)", year: "2012–13", club: "개인" },
  { name: "팰리스 올해의 선수 3연패", year: "2016~2018", club: "개인" },
  { name: "프리미어리그 이달의 선수", year: "2018.04", club: "개인" },
  { name: "프리미어리그 이달의 골", year: "2022.02", club: "개인" }
];

const FACTS = [
  { title: "구단 PL 역대 최다 득점자", desc: "팰리스에서 프리미어리그 68골로 구단 PL 최다 득점 기록 보유. 구단 전체 통산 득점 순위 10위 권(90골)." },
  { title: "PL 역대 최다 상대 퇴장 유도", desc: "자하를 막던 수비수들이 퇴장당한 횟수가 프리미어리그 역대 1위. 그만큼 막을 수 없는 드리블러였다는 증거." },
  { title: "가장 많이 파울당한 선수", desc: "2014~2019년 집계 기준 에덴 아자르에 이어 리그에서 두 번째로 많이 파울당한 선수." },
  { title: "퍼거슨의 마지막 영입", desc: "2013년 알렉스 퍼거슨 감독이 은퇴 전 마지막으로 영입한 선수." },
  { title: "무릎 꿇지 않은 선수", desc: "2021년 3월, 경기 전 반인종주의 무릎 꿇기를 하지 않은 첫 PL 선수. 몸짓보다 교육과 SNS 플랫폼의 실질적 조치를 촉구하며 화제가 됐다." },
  { title: "18년의 동거", desc: "만 8세 유스 입단부터 2023년 이별까지 무려 18년을 팰리스에서 보낸 원클럽맨에 가까운 우정." }
];

const SEASONS = [
  { key: "2010-11", comp: "챔피언십", leagueApps: 41, leagueGoals: 1, totalApps: 44, totalGoals: 1, assists: 2, assistsExact: true, pattern: "stripes", number: 29, note: "17세 데뷔 시즌. 개막전 레스터전에서 시니어 1호골." },
  { key: "2011-12", comp: "챔피언십", leagueApps: 41, leagueGoals: 6, totalApps: 48, totalGoals: 9, assists: 5, assistsExact: true, pattern: "halves", number: 29, note: "풋볼리그 영 플레이어 오브 더 이어 수상. 리그컵 맨유 격파의 주역." },
  { key: "2012-13", comp: "챔피언십", leagueApps: 43, leagueGoals: 6, totalApps: 50, totalGoals: 8, assists: 4, assistsExact: false, pattern: "sash", number: 29, note: "플레이오프 4강 브라이튼전 2골로 위블리 결승 진출 → PL 승격." },
  { key: "2014-15", comp: "프리미어리그", leagueApps: 31, leagueGoals: 4, totalApps: 35, totalGoals: 4, assists: 2, assistsExact: true, pattern: "stripes", number: 29, note: "임대 복귀 후 뉴캐슬전 추가시간 동점골. 2월 완전 이적." },
  { key: "2015-16", comp: "프리미어리그", leagueApps: 34, leagueGoals: 2, totalApps: 43, totalGoals: 5, assists: 1, assistsExact: true, pattern: "halves", number: 29, note: "FA컵 결승 진출(120분 풀타임). 올해의 선수 첫 수상." },
  { key: "2016-17", comp: "프리미어리그", leagueApps: 35, leagueGoals: 7, totalApps: 37, totalGoals: 7, assists: 9, assistsExact: false, pattern: "halves", number: 29, note: "최종전 헐 시티전 선제골로 잔류 확정. 2연속 올해의 선수." },
  { key: "2017-18", comp: "프리미어리그", leagueApps: 29, leagueGoals: 9, totalApps: 29, totalGoals: 9, assists: 5, assistsExact: false, pattern: "stripes", number: 29, note: "첼시전 복귀골로 시즌 첫 승. 4월 이달의 선수·더비 브레이스." },
  { key: "2018-19", comp: "프리미어리그", leagueApps: 34, leagueGoals: 10, totalApps: 36, totalGoals: 10, assists: 9, assistsExact: false, pattern: "sash", number: 11, note: "개막 2연전 득점으로 구단 PL 최다 득점자 등극. 등번호 29→11 변경." },
  { key: "2019-20", comp: "프리미어리그", leagueApps: 38, leagueGoals: 4, totalApps: 39, totalGoals: 4, assists: 4, assistsExact: false, pattern: "stripes", number: 11, note: "38라운드 전경기 출장. 첼시전 장거리 폭발골." },
  { key: "2020-21", comp: "프리미어리그", leagueApps: 30, leagueGoals: 11, totalApps: 31, totalGoals: 11, assists: 9, assistsExact: false, pattern: "halves", number: 11, note: "개막전 결승골 · 올드 트래퍼드 2골. 개인 한 시즌 PL 최다 득점." },
  { key: "2021-22", comp: "프리미어리그", leagueApps: 33, leagueGoals: 14, totalApps: 37, totalGoals: 15, assists: 5, assistsExact: false, pattern: "stripes", number: 11, note: "개막 토트넘전 PK · 400경기 70호골 · 맨시티전 PL 50호골. 커리어 하이 시즌." },
  { key: "2022-23", comp: "프리미어리그", leagueApps: 27, leagueGoals: 7, totalApps: 28, totalGoals: 7, assists: 2, assistsExact: false, pattern: "halves", number: 11, note: "18년의 마지막 시즌. 본머스전이 팰리스에서의 마지막 홈경기가 됐다." }
];

const GOALS = [
  { date: "2010-08-07", season: "2010-11", opp: "레스터 시티", comp: "챔피언십", score: "3-2 승", title: "팰리스 1호골 · 시니어 데뷔골", desc: "데뷔 시즌 개막전에서 터진 커리어 첫 골. 크로이던의 소년이 팰리스 에이스로 가는 첫 신호탄.", query: "Wilfried Zaha first senior goal vs Leicester City 2010", badge: "통산 1호골" },
  { date: "2011-08-23", season: "2011-12", opp: "크롤리 타운", comp: "리그컵", score: "승", title: "시즌 오프닝 멀티골", desc: "2011-12 시즌을 여는 리그컵에서 2골을 몰아치며 기대감을 폭발시켰다.", query: "Wilfried Zaha goals vs Crawley Town 2011 League Cup" },
  { date: "2012-04-21", season: "2011-12", opp: "레딩", comp: "챔피언십", score: "2-2", title: "챔피언 확정팀 상대 득점", desc: "스트라이커로 출전해 리그 우승을 확정하던 레딩 골망을 흔들었다.", query: "Wilfried Zaha goal vs Reading April 2012" },
  { date: "2012-10-02", season: "2012-13", opp: "울버햄튼", comp: "챔피언십", score: "승", title: "시즌 첫 골 x2", desc: "2012-13 시즌 첫 골을 2방으로 장식. 승격 레이스의 서막.", query: "Wilfried Zaha two goals vs Wolverhampton October 2012" },
  { date: "2012-10-06", season: "2012-13", opp: "번리", comp: "챔피언십", score: "4-3 승", title: "4-3 명승부에서 다시 2골", desc: "일주일 만에 또 멀티골. 7골짜리 난타전을 자하가 이끌었다.", query: "Wilfried Zaha goals vs Burnley 4-3 October 2012" },
  { date: "2013-03-05", season: "2012-13", opp: "헐 시티", comp: "챔피언십", score: "4-2 승", title: "이적 발표 후 복귀 첫 골", desc: "맨유 이적이 확정된 채 임대로 복귀한 자하가 승격 직행 경쟁 상대 헐을 상대로 골을 넣었다.", query: "Wilfried Zaha goal vs Hull City March 2013" },
  { date: "2013-05-13", season: "2012-13", opp: "브라이튼", comp: "플레이오프 4강 2차전", score: "2-0 승", title: "위블리로 가는 2골", badge: "M23 더비", desc: "라이벌 브라이튼과의 플레이오프 4강에서 후반에 터뜨린 2골로 팰리스를 위블리 결승으로 끌고 갔다. 팬들이 지금도 부르는 전설의 밤.", query: "Wilfried Zaha two goals vs Brighton playoff semi final 2013" },
  { date: "2013-05-27", season: "2012-13", opp: "워터포드", comp: "플레이오프 결승", score: "1-0 승", title: "승격을 확정한 페널티 획책", badge: "명장면", desc: "웨블리 결승 연장 후반, 자하가 획책한 페널티를 케빈 필립스가 성공. 8년 만의 PL 승격. 자하 스스로 넣은 골은 아니지만 팰리스 역사상 가장 중요한 장면.", query: "Wilfried Zaha penalty won playoff final Watford 2013" },
  { date: "2014-08-30", season: "2014-15", opp: "뉴캐슬 유나이티드", comp: "프리미어리그", score: "3-3 (원정)", minute: "90+", title: "컴백 즉시 동점골", desc: "맨유에서 돌아온 임대 복귀 첫 경기. 추가시간에 동점골을 터뜨리며 '내가 돌아왔다'고 선언했다.", query: "Wilfried Zaha stoppage time equaliser Newcastle 2014" },
  { date: "2016-01-09", season: "2015-16", opp: "사우샘프턴", comp: "FA컵 3라운드", score: "2-1 승 (원정)", minute: "68'", title: "FA컵 3라운드 결승골", desc: "세인트메리 스타디움에서 68분 결승골. FA컵 결승까지 이어지는 대장정의 시작.", query: "Wilfried Zaha goal vs Southampton FA Cup 2016" },
  { date: "2016-01-30", season: "2015-16", opp: "스토크 시티", comp: "FA컵 4라운드", score: "1-0 승", minute: "17'", title: "FA컵 4라운드 유일골", desc: "셀허스트 파크에서 자하의 17분 결승골 하나로 8강행. 이 시즌 FA컵 2골을 모두 결승골로 넣었다.", query: "Wilfried Zaha goal vs Stoke City FA Cup 2016" },
  { date: "2017-05-14", season: "2016-17", opp: "헐 시티", comp: "프리미어리그", score: "4-0 승", minute: "3'", title: "잔류를 확정한 3분 선제골", badge: "시즌 최순간", desc: "최종전 3분 만에 터진 선제골로 팰리스의 PL 잔류를 확정시키고 헐을 챔피언십으로 보냈다.", query: "Wilfried Zaha goal vs Hull City May 2017" },
  { date: "2017-10-14", season: "2017-18", opp: "첼시", comp: "프리미어리그", score: "2-1 승", title: "시즌 첫 승의 시동", desc: "2개월 만의 부상 복귀 복귀전에서 디펜딩 챔피언 첼시를 상대로 선제골. 팰리스의 시즌 첫 승점이었다.", query: "Wilfried Zaha goal vs Chelsea October 2017" },
  { date: "2018-04-14", season: "2017-18", opp: "브라이튼", comp: "프리미어리그", score: "3-2 승", title: "M23 더비 브레이스", badge: "이달의 선수", desc: "M23 더비에서 전반에 2골. 이달 넷 골을 넣으며 PL 이달의 선수까지 수상한 시즌의 하이라이트.", query: "Wilfried Zaha two goals vs Brighton April 2018" },
  { date: "2018-08-11", season: "2018-19", opp: "풀럼", comp: "프리미어리그", score: "2-0 승 (원정)", title: "구단 PL 최다득점 타이", desc: "시즌 개막전 득점으로 PL 통산 23호골. 크리스 암스트롱과 구단 PL 최다 득점 기록을 타이했다.", query: "Wilfried Zaha goal vs Fulham opening day 2018" },
  { date: "2018-08-26", season: "2018-19", opp: "워터포드", comp: "프리미어리그", score: "1-2 패 (원정)", title: "구단 PL 단독 최다득점자 등극", badge: "PL 24호골", desc: "2주 만에 기록을 깼다. 팰리스 소속으로 PL 24호골, 구단 역대 PL 최다 득점자가 됐다.", query: "Wilfried Zaha record goal vs Watford August 2018" },
  { date: "2018-09", season: "2018-19", opp: "허더즈필드", comp: "프리미어리그", score: "승", title: "결승골", desc: "9월 허더즈필드전에서 또 결승골. 착실하게 승점을 쌓아간 시즌.", query: "Wilfried Zaha winning goal vs Huddersfield 2018" },
  { date: "2019-11", season: "2019-20", opp: "첼시", comp: "프리미어리그", score: "승", title: "빅클럽 상대 장거리 폭탄", desc: "2019-20 시즌 하이라이트. 첼시를 상대로 터뜨린 장거리 슈팅 골.", query: "Wilfried Zaha long range goal vs Chelsea 2019" },
  { date: "2020-09-12", season: "2020-21", opp: "사우샘프턴", comp: "프리미어리그", score: "1-0 승", title: "개막전 결승골", desc: "무관중 개막전에서 유일한 골로 시즌을 시작.", query: "Wilfried Zaha goal vs Southampton September 2020" },
  { date: "2020-09-19", season: "2020-21", opp: "맨체스터 유나이티드", comp: "프리미어리그", score: "3-1 승 (원정)", title: "올드 트래퍼드 브레이스", desc: "옛 주인 맨유를 상대로 원정에서 2골. 가장 달콤했던 복수극.", query: "Wilfried Zaha two goals vs Manchester United Old Trafford 2020" },
  { date: "2021-05-16", season: "2020-21", opp: "애스턴 빌라", comp: "프리미어리그", score: "3-2 승", title: "개인 한 시즌 PL 최다 득점", desc: "시즌 11호 리그 골로 PL 데뷔 후 개인 최다 득점 기록을 경신.", query: "Wilfried Zaha goal vs Aston Villa May 2021" },
  { date: "2021-09-27", season: "2021-22", opp: "브라이튼", comp: "프리미어리그", score: "1-1", minute: "45+2'", title: "400경기 기념 통산 70호골", badge: "통산 70호골", desc: "팰리스에서의 400번째 경기를 기념골으로 장식했다. 상대는 하필 브라이튼.", query: "Wilfried Zaha 400th appearance goal vs Brighton 2021" },
  { date: "2021-10-30", season: "2021-22", opp: "맨체스터 시티", comp: "프리미어리그", score: "2-0 승 (원정)", title: "구단 최초 PL 통산 50호골", badge: "PL 50호골", desc: "에티하드 스타디움에서 팰리스 선수 최초로 PL 50골 고지를 밟았다. 이 시즌 리그 14골으로 커리어 하이.", query: "Wilfried Zaha 50th Premier League goal vs Manchester City 2021" },
  { date: "2023-05-13", season: "2022-23", opp: "AFC 본머스", comp: "프리미어리그", score: "2-0 승", title: "마지막 홈경기 · 마지막 어시스트", badge: "고별전", desc: "팰리스에서의 마지막 경기. 첫 골을 세팅하며 18년의 시간에 꽃을 놓았다. 경기 후 홈 팬들의 기립박수가 이어졌다.", query: "Wilfried Zaha final Crystal Palace home game Bournemouth 2023 farewell" }
];

const PHOTO_CAPTIONS = [
  "유스 시절의 소년", "2010 데뷔 시즌", "셀허스트 파크 데뷔전", "1호골 세리머니", "2011-12 브레이크 시즌",
  "풋볼리그 영플레이어 수상", "리그컵 맨유전 돌파", "2013 플레이오프 4강", "위블리 결승의 밤", "PL 승격 세리머니",
  "맨유 시절 데뷔전", "카디프 임대 생활", "2014 팰리스 복귀", "뉴캐슬전 동점골", "2016 FA컵 4강",
  "FA컵 결승 위블리", "올해의 선수 수상", "첼시전 복귀골", "2018 더비 브레이스", "이달의 선수 트로피",
  "돌파하는 자하", "1대1 드리블", "코너 깃발 앞에서", "팬들과 함께", "코트디부아르 대표팀",
  "AFCON 출전", "올드 트래퍼드에서의 2골", "2021 개막전 결승골", "400경기 기념골", "맨시티전 PL 50호골",
  "2022 커리어 하이 시즌", "작별 시즌의 미소", "마지막 홈경기", "18년의 마지막 인사", "훈련장에서",
  "경기 전 포커스"
];

const PRODUCTS = [
  { id: "p1", name: "자하 #11 홈 레플리카 유니폼", desc: "2022-23 작별 시즌 하프 레드&블루 디자인 (팬 메이드)", price: 89000, art: "kit", pattern: "halves", number: 11, tag: "인기" },
  { id: "p2", name: "레트로 #29 스트라이프 유니폼", desc: "2010년대 초반 감성의 스트라이프 레플리카 (팬 메이드)", price: 79000, art: "kit", pattern: "stripes", number: 29, tag: "레트로" },
  { id: "p3", name: "이글 스카프", desc: "붉고 파란 줄무늬 + 자하 이름 새김", price: 35000, art: "scarf", tag: "필수템" },
  { id: "p4", name: "자하 마우스패드", desc: "레드&블루 하프 디자인 900x400mm", price: 19900, art: "mousepad", tag: "" },
  { id: "p5", name: "WILF 12 SEASONS 레트로 티셔츠", desc: "팰리스에서 보낸 12시즌을 기념하는 특별 에디션", price: 45000, art: "tee", tag: "기념" },
  { id: "p6", name: "자하 명장면 포스터 세트 (3종)", desc: "플레이오프 4강, FA컵, PL 50호골 아트 포스터", price: 15000, art: "poster", tag: "" },
  { id: "p7", name: "CPFC 이글 머그컵", desc: "레드&블루 하프 컬러 350ml", price: 18000, art: "mug", tag: "" },
  { id: "p8", name: "자하 엠블럼 키링", desc: "양면 각인 WZ 엠블럼", price: 9900, art: "keyring", tag: "" },
  { id: "p9", name: "레드&블루 이글 양말", desc: "하프 컬러 롱삭스 2켤레 세트", price: 12000, art: "socks", tag: "" },
  { id: "p10", name: "미니 이글 인형", desc: "책상 위 응원단 마스코트", price: 26000, art: "figure", tag: "신상" }
];

const SCENARIOS = [
  { id: "s1", title: "데뷔골을 넣어라", meta: "2010.08.07 · 챔피언십 vs 레스터", desc: "17세 소년의 첫 골. 3회 안에 1골을 넣으면 성공.", target: 1, attempts: 3, skill: 0.32 },
  { id: "s2", title: "PL 잔류를 확정지어라", meta: "2017.05.14 · PL vs 헐 시티", desc: "최종전 3분 선제골의 순간을 재현하라.", target: 1, attempts: 3, skill: 0.5 },
  { id: "s3", title: "컴백의 동점골", meta: "2014.08.30 · PL 원정 vs 뉴캐슬", desc: "임대 복귀 첫 경기, 추가시간 동점골을 만들어라.", target: 1, attempts: 3, skill: 0.55 },
  { id: "s4", title: "M23 더비 브레이스", meta: "2018.04.14 · PL vs 브라이튼", desc: "더비에서 2골. 브라이튼 골키퍼는 오늘 컨디션이 좋다.", target: 2, attempts: 5, skill: 0.62 },
  { id: "s5", title: "PL 통산 50호골", meta: "2021.10.30 · PL 원정 vs 맨시티", desc: "에티하드의 골키퍼는 리그 최고 수준. 한 방을 노려라.", target: 1, attempts: 3, skill: 0.78 },
  { id: "s6", title: "마지막 홈경기의 승리", meta: "2023.05.13 · PL vs 본머스", desc: "18년의 마지막, 팬들에게 2골의 선물을 남겨라.", target: 2, attempts: 5, skill: 0.68 }
];
