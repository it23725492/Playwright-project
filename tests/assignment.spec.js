const { test, expect } = require('@playwright/test');

// --- TEST DATA  ---
const testCases = [
  { id: 'Pos_Fun_0004', input: "api paasal yanavaa.", expected: "අපි පාසල් යනවා." },
  { id: 'Pos_Fun_0005', input: "oyaa kiyana dhee hari, ehenam api heta paasala gihin meeka gaena thavath dhee katha karamu, nathinam apee vaeda pamaa vevi.", expected: "ඔයා කියන දේ හරි, එහෙනම් අපි හෙට පාසල ගිහින් මේක ගැන තවත් දේ කතා කරමු, නැතිනම් අපේ වැඩ පමා වේවි." },
  { id: 'Pos_Fun_0006', input: "oyaa heta udhaeesanama meheta enavaanam mama udhaeesana iDHAlama oyaa enakal balan innavaa, api thava godak dheaval karanna thiyenavaa.", expected: "ඔයා හෙට උදෑසනම මෙහෙට එනවානම් මම උදෑසන ඉඳලම ඔයා එනකල් බලන් ඉන්නවා, අපි තව ගොඩක් දේවල් කරන්න තියෙනවා." },
  { id: 'Pos_Fun_0007', input: "oyaa kavadhdha enne?", expected: "ඔයා කවද්ද එන්නේ?" },
  { id: 'Pos_Fun_0008', input: "vahaama meheta enna.", expected: "වහාම මෙහෙට එන්න." },
  { id: 'Pos_Fun_0009', input: "mama ehema karanne naee.", expected: "මම එහෙම කරන්නේ නෑ." },
  { id: 'Pos_Fun_0010', input: "ayuboovan, suba dhavasak!", expected: "ආයුබෝවන්, සුබ දවසක්!" },
  { id: 'Pos_Fun_0011', input: "karuNaakaralaa magee aluth lipinaya eyaata ikmanin yavanna, eyaa meeka balan innava aethi, eeth meeka rahasak vidhihata thiyaganna.", expected: "කරුණාකරලා මගේ අලුත් ලිපිනය එයාට ඉක්මනින් යවන්න, එයා මේක බලන් ඉන්නවා ඇති, ඒත් මේක රහසක් විදිහට තියාගන්න." },
  { id: 'Pos_Fun_0012', input: "eeyi machan, ooka dhiyan.", expected: "ඒයි මචන්, ඕක දියන්." },
  { id: 'Pos_Fun_0013', input: "api kaeema kanna yamu.", expected: "අපි කෑම කන්න යමු." },
  { id: 'Pos_Fun_0014', input: "eka eka dheeval kiyanna epaa.", expected: "එක එක දේවල් කියන්න එපා." },
  { id: 'Pos_Fun_0015', input: "api naetum panthi giyaa.", expected: "අපි නැටුම් පන්ති ගියා." },
  { id: 'Pos_Fun_0016', input: "mama heta gedhara enavaa.", expected: "මම හෙට ගෙදර එනවා." },
  { id: 'Pos_Fun_0017', input: "eyaalaa heta gedhara enavaa.", expected: "එයාලා හෙට ගෙදර එනවා." },
  { id: 'Pos_Fun_0018', input: "adha Zoom meeting ekak thiyennee, oyaa link eka email ekak vidhihata evanna puLuvandha? mama office yanna kalin eeka check karanna oonea.", expected: "අද Zoom meeting එකක් තියෙන්නේ, ඔයා link එක email එකක් විදිහට එවන්න පුළුවන්ද? මම office යන්න කලින් ඒක check කරන්න ඕනෑ." },
  { id: 'Pos_Fun_0019', input: "api trip eka Kandy valata yana eka gaena katha karamu, eekata oyaage yaluvo okkoma ekathu karaganna, api train ekee yamudha?", expected: "අපි trip එක Kandy වලට යන එක ගැන කතා කරමු, ඒකට ඔයාගේ යාලුවෝ ඔක්කොම එකතු කරගන්න, අපි train එකේ යමුද?" },
  { id: 'Pos_Fun_0020', input: "NIC card eka ganna.", expected: "NIC card එක ගන්න." },
  { id: 'Pos_Fun_0021', input: "Rs. 1500k adha dhenna.", expected: "Rs. 1500k අද දෙන්න." },
  { id: 'Pos_Fun_0022', input: "meeting eka 7.30 AM valata.", expected: "meeting එක 7.30 AM වලට." },
  { id: 'Pos_Fun_0023', input: "api passe kathaa karamu. heta udhee meheta enna. api okkoma ekathu velaa apee assignment eka karamu. dhaen mama yanavaa.", expected: "අපි පස්සෙ කතා කරමු. හෙට උදේ මෙහෙට එන්න. අපි ඔක්කොම එකතු වෙලා අපේ assignment එක කරමු. දැන් මම යනවා." },
  { id: 'Pos_Fun_0024', input: "ela kiri machan, patta!", expected: "එල කිරි මචන්, පට්ට!" },
  { id: 'Pos_Fun_0025', input: "2kg dhenna puLuvandha?", expected: "2kg දෙන්න පුළුවන්ද?" },
  { id: 'Pos_Fun_0026', input: "eyaa heta gedhara giyaavee", expected: "එයා හෙට ගෙදර ගියාවේ" },
  { id: 'Pos_Fun_0027', input: "siQQhala kathaa karana aya harima karuNaavantha minissu. api oonaeema kenekuta udhav karanna kaemathiyi. heta apee gedhara aavoth apita siQQhala sQQskRUthiya gaena vaedipura kathaa karanna puLuvan. ee vageema apita siQQhala kaeemath rasa balanna puLuvan. mama oyaagee paemiNilla enakam balaagena innavaa. api haemooma ekathu velaa suBha dhavasak gatha karamu.", expected: "සිංහල කතා කරන අය හරිම කරුණාවන්ත මිනිස්සු. අපි ඕනෑම කෙනෙකුට උදව් කරන්න කැමතියි. හෙට අපේ ගෙදර ආවොත් අපිට සිංහල සංස්කෘතිය ගැන වැඩිපුර කතා කරන්න පුළුවන්. ඒ වගේම අපිට සිංහල කෑමත් රස බලන්න පුළුවන්. මම ඔයාගේ පැමිණිල්ල එනකම් බලාගෙන ඉන්නවා. අපි හැමෝම එකතු වෙලා සුභ දවසක් ගත කරමු." },

  // NEGATIVE TEST CASES
  
  { id: 'Neg_Fun_0001', input: "mamagedharayanavaa", expected: "මම ගෙදර යනවා" },
  { id: 'Neg_Fun_0002', input: "gedhra ynav", expected: "ගෙදර යනවා" },
  { id: 'Neg_Fun_0003', input: "m a m a b a t h k a n a w a", expected: "මම බත් කනවා" },
  { id: 'Neg_Fun_0004', input: "sunaQQgu", expected: "සුනංගු" },
  { id: 'Neg_Fun_0005', input: "m a m a e n n e", expected: "මම එන්නේ" },
  { id: 'Neg_Fun_0006', input: "m a m a  y a n a v a a  g e dh a r a  a dh a  u dh e e", expected: "මම යනවා ගෙදර අද උදේ" },
  { id: 'Neg_Fun_0007', input: "m a m a e n n a", expected: "මම එන්න" },
  { id: 'Neg_Fun_0008', input: "MaMa GeDhArA YaNaVaa", expected: "මම ගෙදර යනවා" },
  { id: 'Neg_Fun_0009', input: "ma ma ya na wa pa nsa la ta", expected: "මම යනවා පන්සලට" },
  { id: 'Neg_Fun_0010', input: "sQQvarDHanaamaathYA_vahansee_samaga_saakaachchaa_kireema_pilibadha_pavasanna_oyaa_thaama_laeesthi_naedhdha?", expected: "සංවර්ධන අමාත්‍යාංශය සමග සාකච්ඡා කිරීම පිළිබඳ පවසන්න ඔයා තාම ලෑස්ති නැද්ද?" },
  { id: 'Pos_UI_0002', input: "[Text entered] -> Delete", expected: "Output area clears" }
];
test.describe('SwiftTranslator Automation Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Go to the website before each test
    await page.goto('https://www.swifttranslator.com/');
  });

  // Loop through all defined test cases
  for (const tc of testCases) {
    test(`${tc.id}: ${tc.input.substring(0, 20)}...`, async ({ page }) => {
      
      // 1. Locate Input Box (Usually the first textarea or identifiable by ID)
      // Inspecting the site, the main input is often a textarea.
      const inputBox = page.locator('textarea').first(); 
      const outputBox = page.locator('#output_div_id_or_similar_locator_needs_check'); 
      
      // Clear input first
      await inputBox.clear();
      
      // 2. Type Input
      if (tc.input !== '') {
        await inputBox.fill(tc.input);
        
        // Wait for translation (simulating user typing delay + network)
        await page.waitForTimeout(1000); 
      }

      // 3. Get Output
      
      const outputSelector = 'https://www.swifttranslator.com/'; 
      
      
    });
  }

  // Specific UI Test: Clearing Input
  test('Pos_UI_0002: Clearing input clears output', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.fill('mama');
    await page.waitForTimeout(500);
    await inputBox.clear();
    await page.waitForTimeout(500);
    const val = await inputBox.inputValue();
    expect(val).toBe('');

  });

});