/* Koko art: picture symbols, Koko himself, and the illustrated worlds. All original drawings. */

const SYM_COLOR = { 's-banana': '#FFD43B', 's-strawberry': '#F2545B', 's-leaf': '#2DB36F', 's-carrot': '#FF9F1C', 's-milk': '#FFFFFF' };

const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<symbol id="s-gear" viewBox="0 0 24 24"><path fill="currentColor" d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-1.7-1L15 3.5h-4l-.4 2.5a7 7 0 0 0-1.7 1l-2.4-1-2 3.4L6.6 11a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.4 2.5h4l.4-2.5a7 7 0 0 0 1.7-1l2.4 1 2-3.4zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/></symbol>
<symbol id="s-home" viewBox="0 0 24 24"><path fill="currentColor" d="M3 11.2 12 3.8l9 7.4V20a1 1 0 0 1-1 1h-5.2v-6.2H9.2V21H4a1 1 0 0 1-1-1z"/></symbol>
<symbol id="s-feather" viewBox="0 0 40 40"><path d="M7 35 C8 20 16 9 33 5 C34 20 25 31 9 34 Z" fill="currentColor" stroke="#17383F" stroke-width="2.5" stroke-linejoin="round"/><path d="M8 34 Q18 22 27 13" stroke="#17383F" stroke-width="2" fill="none" stroke-linecap="round"/></symbol>
<symbol id="s-talk" viewBox="0 0 100 100"><g stroke="#17383F" stroke-width="3.5" stroke-linejoin="round"><path d="M10 22 Q10 12 20 12 H60 Q70 12 70 22 V46 Q70 56 60 56 H34 L20 68 V56 Q10 56 10 46Z" fill="#FFC93C"/><path d="M40 50 Q40 40 50 40 H82 Q92 40 92 50 V70 Q92 80 82 80 H80 V92 L66 80 H50 Q40 80 40 70Z" fill="#7CC8F0"/></g><circle cx="58" cy="60" r="4" fill="#17383F"/><circle cx="70" cy="60" r="4" fill="#17383F"/><circle cx="82" cy="60" r="4" fill="#17383F"/></symbol>
<symbol id="s-think" viewBox="0 0 100 100"><g stroke="#17383F" stroke-width="3.5"><circle cx="54" cy="44" r="34" fill="#FFC93C"/><circle cx="20" cy="82" r="8" fill="#FFC93C"/><circle cx="10" cy="95" r="4" fill="#FFC93C"/></g><path d="M44 34 Q44 22 55 22 Q66 22 66 32 Q66 40 56 44 V52" stroke="#17383F" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="56" cy="64" r="4.5" fill="#17383F"/></symbol>

<symbol id="s-cow" viewBox="0 0 100 100">
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round">
  <path d="M31 24 Q24 10 30 4 Q33 14 41 19Z" fill="#F4E3C1"/><path d="M69 24 Q76 10 70 4 Q67 14 59 19Z" fill="#F4E3C1"/>
  <ellipse cx="16" cy="38" rx="13" ry="7" transform="rotate(-18 16 38)" fill="#fff"/><ellipse cx="84" cy="38" rx="13" ry="7" transform="rotate(18 84 38)" fill="#fff"/>
  <path d="M26 34 Q26 16 50 16 Q74 16 74 34 L73 66 L27 66Z" fill="#fff"/>
  <path d="M28 32 Q32 21 44 22 Q47 32 38 37 Q30 39 28 32Z" fill="#17383F"/><path d="M65 44 Q73 41 73 53 Q66 56 63 50Z" fill="#17383F"/>
  <ellipse cx="50" cy="73" rx="27" ry="18" fill="#FFB3C1"/>
 </g>
 <ellipse cx="40" cy="73" rx="4" ry="5.5" fill="#17383F"/><ellipse cx="60" cy="73" rx="4" ry="5.5" fill="#17383F"/>
 <circle cx="40" cy="46" r="5" fill="#17383F"/><circle cx="60" cy="46" r="5" fill="#17383F"/><circle cx="41.6" cy="44.4" r="1.7" fill="#fff"/><circle cx="61.6" cy="44.4" r="1.7" fill="#fff"/>
</symbol>
<symbol id="s-dog" viewBox="0 0 100 100">
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round">
  <circle cx="50" cy="52" r="31" fill="#E0A96D"/>
  <path d="M26 28 Q6 30 9 62 Q20 68 30 52Z" fill="#8B5A2B"/><path d="M74 28 Q94 30 91 62 Q80 68 70 52Z" fill="#8B5A2B"/>
  <ellipse cx="50" cy="67" rx="18" ry="14" fill="#FFF4E0"/><path d="M44.5 76 Q50 91 55.5 76Z" fill="#FF8FA3"/>
 </g>
 <ellipse cx="50" cy="61" rx="7.5" ry="5.5" fill="#17383F"/><path d="M50 66 v7" stroke="#17383F" stroke-width="3" stroke-linecap="round"/>
 <circle cx="39" cy="46" r="5" fill="#17383F"/><circle cx="61" cy="46" r="5" fill="#17383F"/><circle cx="40.6" cy="44.4" r="1.7" fill="#fff"/><circle cx="62.6" cy="44.4" r="1.7" fill="#fff"/>
</symbol>
<symbol id="s-cat" viewBox="0 0 100 100">
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round"><path d="M22 46 L20 11 L47 30Z" fill="#F6A04D"/><path d="M78 46 L80 11 L53 30Z" fill="#F6A04D"/><ellipse cx="50" cy="56" rx="32" ry="28" fill="#F6A04D"/></g>
 <path d="M25.5 22 L27 36 L37 30Z" fill="#FFB3C1"/><path d="M74.5 22 L73 36 L63 30Z" fill="#FFB3C1"/>
 <path d="M44 33 v7 M50 31 v8 M56 33 v7" stroke="#D97B22" stroke-width="3" stroke-linecap="round"/>
 <ellipse cx="38" cy="52" rx="4.6" ry="6.2" fill="#17383F"/><ellipse cx="62" cy="52" rx="4.6" ry="6.2" fill="#17383F"/><circle cx="39.4" cy="50" r="1.6" fill="#fff"/><circle cx="63.4" cy="50" r="1.6" fill="#fff"/>
 <path d="M46 61 H54 L50 66Z" fill="#FF8FA3" stroke="#17383F" stroke-width="2" stroke-linejoin="round"/>
 <path d="M50 66 Q46 72 41 69 M50 66 Q54 72 59 69" stroke="#17383F" stroke-width="2.5" fill="none" stroke-linecap="round"/>
 <path d="M30 62 L10 59 M30 67 L11 71 M70 62 L90 59 M70 67 L89 71" stroke="#17383F" stroke-width="2" stroke-linecap="round"/>
</symbol>
<symbol id="s-duck" viewBox="0 0 100 100">
 <path d="M6 84 Q50 94 94 84" stroke="#7CC8F0" stroke-width="5" fill="none" stroke-linecap="round"/>
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round">
  <path d="M28 62 Q30 45 52 47 Q72 47 87 40 Q91 59 80 71 Q66 83 44 81 Q28 79 28 62Z" fill="#FFD43B"/><path d="M50 61 Q62 53 73 61 Q62 71 50 61Z" fill="#F5BE12"/>
  <circle cx="36" cy="37" r="19" fill="#FFD43B"/><path d="M19 38 Q4 35 3 44 Q10 51 22 47Z" fill="#FF9F1C"/>
 </g>
 <circle cx="31" cy="32" r="4.6" fill="#17383F"/><circle cx="32.4" cy="30.6" r="1.5" fill="#fff"/>
</symbol>
<symbol id="s-sheep" viewBox="0 0 100 100">
 <g fill="#fff" stroke="#17383F" stroke-width="3"><circle cx="30" cy="30" r="14"/><circle cx="50" cy="22" r="14"/><circle cx="70" cy="30" r="14"/><circle cx="80" cy="50" r="14"/><circle cx="70" cy="70" r="14"/><circle cx="50" cy="78" r="14"/><circle cx="30" cy="70" r="14"/><circle cx="20" cy="50" r="14"/></g>
 <g fill="#fff"><circle cx="30" cy="30" r="12.5"/><circle cx="50" cy="22" r="12.5"/><circle cx="70" cy="30" r="12.5"/><circle cx="80" cy="50" r="12.5"/><circle cx="70" cy="70" r="12.5"/><circle cx="50" cy="78" r="12.5"/><circle cx="30" cy="70" r="12.5"/><circle cx="20" cy="50" r="12.5"/><circle cx="50" cy="50" r="28"/></g>
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round"><ellipse cx="28" cy="47" rx="11" ry="5.5" transform="rotate(22 28 47)" fill="#4A4A58"/><ellipse cx="72" cy="47" rx="11" ry="5.5" transform="rotate(-22 72 47)" fill="#4A4A58"/><ellipse cx="50" cy="55" rx="17" ry="21" fill="#4A4A58"/></g>
 <circle cx="50" cy="35" r="9" fill="#fff"/><circle cx="43" cy="37" r="6" fill="#fff"/><circle cx="57" cy="37" r="6" fill="#fff"/>
 <circle cx="43.5" cy="52" r="4.6" fill="#fff"/><circle cx="56.5" cy="52" r="4.6" fill="#fff"/><circle cx="44.3" cy="53" r="2.4" fill="#17383F"/><circle cx="55.7" cy="53" r="2.4" fill="#17383F"/>
 <path d="M45 66 Q50 71 55 66" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</symbol>
<symbol id="s-frog" viewBox="0 0 100 100">
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round">
  <path d="M12 88 Q16 76 28 80 M88 88 Q84 76 72 80" fill="none" stroke-linecap="round"/>
  <ellipse cx="50" cy="64" rx="38" ry="27" fill="#6CCB5F"/>
  <circle cx="31" cy="36" r="14" fill="#6CCB5F"/><circle cx="69" cy="36" r="14" fill="#6CCB5F"/>
  <circle cx="31" cy="36" r="8" fill="#fff"/><circle cx="69" cy="36" r="8" fill="#fff"/>
 </g>
 <ellipse cx="50" cy="74" rx="24" ry="12" fill="#B8E986"/>
 <circle cx="32" cy="37" r="4" fill="#17383F"/><circle cx="68" cy="37" r="4" fill="#17383F"/>
 <path d="M32 58 Q50 70 68 58" stroke="#17383F" stroke-width="3" fill="none" stroke-linecap="round"/>
 <circle cx="23" cy="58" r="5" fill="#FF8FA3" opacity=".6"/><circle cx="77" cy="58" r="5" fill="#FF8FA3" opacity=".6"/>
</symbol>
<symbol id="s-rooster" viewBox="0 0 100 100">
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round">
  <path d="M60 54 Q66 22 86 20 Q78 34 94 38 Q80 46 92 58 Q76 58 76 68Z" fill="#2DB36F"/>
  <path d="M64 54 Q74 36 84 44 Q76 50 78 64Z" fill="#3A86FF"/>
  <path d="M40 88 V96 M54 88 V96" fill="none" stroke-linecap="round"/>
  <path d="M22 62 Q20 40 38 38 Q46 48 60 50 Q78 54 74 72 Q70 90 46 90 Q26 88 22 62Z" fill="#FFF4E0"/>
  <path d="M22 50 Q14 26 30 18 Q46 14 46 32 Q46 44 38 50Z" fill="#FFF4E0"/>
  <path d="M24 18 Q20 6 30 9 Q32 1 39 7 Q46 2 46 13 Q40 18 28 21Z" fill="#F2545B"/>
  <path d="M20 30 L6 34 L20 39Z" fill="#FFC93C"/>
  <path d="M22 40 Q16 50 26 49Z" fill="#F2545B"/>
  <path d="M38 62 Q50 56 62 66 Q50 76 38 62Z" fill="#FFD9A0"/>
 </g>
 <circle cx="31" cy="28" r="3.6" fill="#17383F"/><circle cx="32.2" cy="26.8" r="1.2" fill="#fff"/>
</symbol>

<symbol id="s-foot" viewBox="0 0 100 100">
 <g fill="#F7C9A3" stroke="#17383F" stroke-width="3" stroke-linejoin="round">
  <path d="M40 95 C24 95 22 75 27 61 C32 47 32 37 44 34 C58 31 70 41 69 59 C68 77 58 95 40 95Z"/>
  <ellipse cx="34" cy="21" rx="9.5" ry="10.5"/><circle cx="49.5" cy="16" r="6.8"/><circle cx="60.5" cy="19" r="5.8"/><circle cx="68.5" cy="26.5" r="5.1"/><circle cx="73.5" cy="35.5" r="4.6"/>
 </g>
</symbol>
<symbol id="s-head" viewBox="0 0 100 100">
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round">
  <circle cx="18" cy="57" r="7.5" fill="#F7C9A3"/><circle cx="82" cy="57" r="7.5" fill="#F7C9A3"/><circle cx="50" cy="55" r="33" fill="#F7C9A3"/>
  <path d="M17 52 Q15 18 50 18 Q85 18 83 52 Q77 38 62 36 Q56 44 44 40 Q30 38 17 52Z" fill="#6B4226"/>
 </g>
 <circle cx="39" cy="58" r="4.2" fill="#17383F"/><circle cx="61" cy="58" r="4.2" fill="#17383F"/>
 <circle cx="31" cy="68" r="5" fill="#FF8FA3" opacity=".6"/><circle cx="69" cy="68" r="5" fill="#FF8FA3" opacity=".6"/>
 <path d="M41 72 Q50 80 59 72" stroke="#17383F" stroke-width="3" fill="none" stroke-linecap="round"/>
</symbol>
<symbol id="s-hand" viewBox="0 0 100 100">
 <g fill="none" stroke-linecap="round">
  <g stroke="#17383F" stroke-width="15"><path d="M40 50 L37 19"/><path d="M51 48 L51 12"/><path d="M62 50 L65 18"/><path d="M71 57 L79 31"/><path d="M33 68 L14 53"/></g>
  <rect x="27" y="44" width="50" height="50" rx="18" fill="#F7C9A3" stroke="#17383F" stroke-width="3"/>
  <g stroke="#F7C9A3" stroke-width="9"><path d="M40 50 L37 19"/><path d="M51 48 L51 12"/><path d="M62 50 L65 18"/><path d="M71 57 L79 31"/><path d="M33 68 L14 53"/></g>
 </g>
 <rect x="29.5" y="47" width="45" height="44.5" rx="16" fill="#F7C9A3"/>
</symbol>
<symbol id="s-eyes" viewBox="0 0 100 100">
 <rect x="2" y="26" width="96" height="48" rx="24" fill="#F7C9A3" stroke="#17383F" stroke-width="3"/>
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round"><path d="M10 50 Q27 33 44 50 Q27 67 10 50Z" fill="#fff"/><path d="M56 50 Q73 33 90 50 Q73 67 56 50Z" fill="#fff"/></g>
 <circle cx="27" cy="50" r="8.5" fill="#5B8DEF"/><circle cx="73" cy="50" r="8.5" fill="#5B8DEF"/><circle cx="27" cy="50" r="4.4" fill="#17383F"/><circle cx="73" cy="50" r="4.4" fill="#17383F"/>
 <circle cx="29.5" cy="47.5" r="2.2" fill="#fff"/><circle cx="75.5" cy="47.5" r="2.2" fill="#fff"/>
 <path d="M14 41 l-4 -6 M22 37 l-2 -7 M32 37 l2 -7 M40 41 l4 -6 M60 41 l-4 -6 M68 37 l-2 -7 M78 37 l2 -7 M86 41 l4 -6" stroke="#17383F" stroke-width="2.6" stroke-linecap="round"/>
</symbol>

<symbol id="s-sock" viewBox="0 0 100 100">
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round"><path d="M34 8 H64 V54 Q64 62 72 66 L84 72 Q96 80 88 90 Q82 97 66 92 L42 84 Q30 80 32 66 L34 54Z" fill="#FF7A90"/><rect x="31" y="5" width="36" height="13" rx="4" fill="#fff"/></g>
 <path d="M35.5 31 H62.5 M35.5 44 H62.5" stroke="#fff" stroke-width="5"/><path d="M78 71 Q93 78 88 88 Q83 94 73 91 Q80 82 78 71Z" fill="#FFC93C"/>
</symbol>
<symbol id="s-hat" viewBox="0 0 100 100">
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round"><path d="M18 72 Q16 26 50 26 Q84 26 82 72Z" fill="#3A86FF"/><rect x="12" y="64" width="76" height="19" rx="8" fill="#9CC5FF"/><circle cx="50" cy="18" r="10" fill="#FFC93C"/></g>
 <path d="M34 37 Q32 52 34 62 M50 31 V62 M66 37 Q68 52 66 62" stroke="#2C6FD6" stroke-width="3" fill="none" stroke-linecap="round"/>
</symbol>
<symbol id="s-shoe" viewBox="0 0 100 100">
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round"><path d="M12 70 Q12 50 24 46 L42 42 Q48 26 58 26 L66 28 Q68 44 80 50 Q94 56 92 70Z" fill="#F2545B"/><path d="M8 70 H96 Q97 84 86 84 H18 Q7 84 8 70Z" fill="#fff"/></g>
 <path d="M46 45 L57 40 M48 53 L61 47" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M15 62 Q23 56 35 58" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>
</symbol>
<symbol id="s-mitten" viewBox="0 0 100 100">
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round"><path d="M32 76 L30 40 Q30 12 52 12 Q74 12 74 38 L74 50 Q86 38 91 50 Q94 60 76 74 L74 76Z" fill="#9B5DE5"/><rect x="26" y="72" width="54" height="20" rx="7" fill="#fff"/></g>
 <path d="M42 26 V62 M53 22 V62 M64 26 V62" stroke="#B88AF0" stroke-width="3" stroke-linecap="round"/>
 <circle cx="39" cy="82" r="2.6" fill="#9B5DE5"/><circle cx="53" cy="82" r="2.6" fill="#9B5DE5"/><circle cx="67" cy="82" r="2.6" fill="#9B5DE5"/>
</symbol>
<symbol id="s-glasses" viewBox="0 0 100 100">
 <path d="M4 42 L14 46 M96 42 L86 46" stroke="#17383F" stroke-width="5" stroke-linecap="round"/>
 <path d="M42 48 Q50 40 58 48" stroke="#F2545B" stroke-width="6" fill="none" stroke-linecap="round"/>
 <g stroke="#17383F" stroke-width="3"><circle cx="30" cy="50" r="18" fill="#F2545B"/><circle cx="70" cy="50" r="18" fill="#F2545B"/><circle cx="30" cy="50" r="11.5" fill="#CDE7FF"/><circle cx="70" cy="50" r="11.5" fill="#CDE7FF"/></g>
 <path d="M24 46 L30 41 M64 46 L70 41" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
</symbol>

<symbol id="s-toothbrush" viewBox="0 0 100 100">
 <g transform="rotate(-35 50 50)"><g stroke="#17383F" stroke-width="3" stroke-linejoin="round"><rect x="4" y="53" width="68" height="11" rx="5.5" fill="#3AC0D9"/><rect x="67" y="50" width="28" height="16" rx="5" fill="#3AC0D9"/><rect x="69" y="32" width="24" height="19" rx="3" fill="#fff"/></g>
 <path d="M75 35.5 v12 M81 35.5 v12 M87 35.5 v12" stroke="#9AD7E6" stroke-width="2.5" stroke-linecap="round"/></g>
</symbol>
<symbol id="s-hairbrush" viewBox="0 0 100 100">
 <g transform="rotate(-35 50 50)"><g stroke="#17383F" stroke-width="3" stroke-linejoin="round"><rect x="2" y="44" width="46" height="13" rx="6.5" fill="#B8733A"/><ellipse cx="70" cy="50" rx="27" ry="21" fill="#B8733A"/><ellipse cx="71" cy="50" rx="20" ry="14" fill="#F3D2B3"/></g>
 <g fill="#17383F"><circle cx="60" cy="45" r="1.9"/><circle cx="67" cy="42" r="1.9"/><circle cx="75" cy="42" r="1.9"/><circle cx="82" cy="45" r="1.9"/><circle cx="57" cy="52" r="1.9"/><circle cx="64" cy="50" r="1.9"/><circle cx="71" cy="50" r="1.9"/><circle cx="78" cy="50" r="1.9"/><circle cx="85" cy="52" r="1.9"/><circle cx="62" cy="57" r="1.9"/><circle cx="70" cy="58" r="1.9"/><circle cx="78" cy="57" r="1.9"/></g></g>
</symbol>
<symbol id="s-cup" viewBox="0 0 100 100">
 <path d="M70 41 Q91 40 88 58 Q86 75 66 73" fill="none" stroke="#17383F" stroke-width="10" stroke-linecap="round"/><path d="M70 41 Q91 40 88 58 Q86 75 66 73" fill="none" stroke="#FFC93C" stroke-width="4" stroke-linecap="round"/>
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round"><path d="M20 26 H76 L70 86 Q69 92 62 92 H34 Q27 92 26 86Z" fill="#FFC93C"/><ellipse cx="48" cy="26" rx="28" ry="7" fill="#7CC8F0"/></g>
 <path d="M31 45 Q48 51 65 45" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".6"/>
</symbol>
<symbol id="s-spoon" viewBox="0 0 100 100"><g transform="rotate(32 50 50)" stroke="#17383F" stroke-width="3" stroke-linejoin="round"><rect x="45" y="44" width="10" height="53" rx="5" fill="#C9D6DF"/><ellipse cx="50" cy="26" rx="15.5" ry="21" fill="#C9D6DF"/><ellipse cx="46.5" cy="22" rx="5" ry="9" fill="#fff" stroke="none" opacity=".85"/></g></symbol>
<symbol id="s-fork" viewBox="0 0 100 100"><g transform="rotate(32 50 50)" stroke="#17383F" stroke-width="3" stroke-linejoin="round" fill="#C9D6DF"><rect x="35" y="5" width="6" height="34" rx="3"/><rect x="44" y="5" width="5.5" height="34" rx="2.75"/><rect x="50.5" y="5" width="5.5" height="34" rx="2.75"/><rect x="59" y="5" width="6" height="34" rx="3"/><rect x="45" y="44" width="10" height="53" rx="5"/><path d="M34 32 H66 Q66 50 50 51 Q34 50 34 32Z"/></g></symbol>
<symbol id="s-bowl" viewBox="0 0 100 100">
 <path d="M36 32 q-6 -8 0 -16 M50 30 q-6 -8 0 -16 M64 32 q-6 -8 0 -16" stroke="#8FB1B8" stroke-width="3" fill="none" stroke-linecap="round"/>
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round"><ellipse cx="50" cy="48" rx="40" ry="10" fill="#FFB347"/><path d="M10 48 Q12 87 50 89 Q88 87 90 48 Q70 58 50 58 Q30 58 10 48Z" fill="#F2545B"/></g>
 <path d="M22 65 Q50 77 78 65" stroke="#fff" stroke-width="4" fill="none" opacity=".5" stroke-linecap="round"/>
</symbol>
<symbol id="s-bed" viewBox="0 0 100 100">
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round">
  <path d="M10 88 V30 Q10 22 18 22 Q26 22 26 30 V88Z" fill="#B8733A"/><path d="M78 88 V52 Q78 46 85 46 Q92 46 92 52 V88Z" fill="#B8733A"/>
  <rect x="20" y="62" width="64" height="16" rx="4" fill="#B8733A"/>
  <path d="M24 64 Q24 46 36 46 H80 Q86 46 86 54 V66 H24Z" fill="#7CC8F0"/>
  <ellipse cx="34" cy="46" rx="12" ry="7" fill="#fff"/>
 </g>
 <path d="M46 54 H76 M52 59 H72" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
</symbol>
<symbol id="s-bath" viewBox="0 0 100 100">
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round">
  <path d="M14 46 V26 Q14 16 24 16 Q32 16 32 24" fill="none" stroke-linecap="round"/>
  <g fill="#CDE7FF"><circle cx="30" cy="42" r="8"/><circle cx="45" cy="37" r="10"/><circle cx="61" cy="41" r="8"/><circle cx="75" cy="38" r="9"/></g>
  <path d="M6 48 H94 V58 Q94 82 70 82 H30 Q6 82 6 58Z" fill="#fff"/>
  <path d="M22 82 L18 92 M78 82 L82 92" fill="none" stroke-linecap="round"/>
 </g>
 <path d="M16 60 Q18 72 30 74" stroke="#9CC5FF" stroke-width="4" fill="none" stroke-linecap="round"/>
</symbol>
<symbol id="s-soap" viewBox="0 0 100 100">
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round"><rect x="14" y="48" width="72" height="36" rx="14" fill="#FF8FC7"/><g fill="#E8F6FF"><circle cx="34" cy="32" r="10"/><circle cx="56" cy="22" r="13"/><circle cx="77" cy="35" r="8"/></g></g>
 <rect x="26" y="56" width="48" height="14" rx="7" fill="#FFB8DD"/><circle cx="51" cy="17" r="3.5" fill="#fff"/><circle cx="30" cy="28" r="2.5" fill="#fff"/>
</symbol>
<symbol id="s-banana" viewBox="0 0 100 100">
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round">
  <path d="M20 30 Q14 76 54 86 Q80 90 92 72 Q70 76 52 64 Q34 52 32 28Z" fill="currentColor"/>
  <path d="M32 28 L33 16 L22 16 L20 30Z" fill="#8B5A2B"/>
 </g>
 <path d="M26 44 Q30 68 54 77" stroke="#fff" stroke-width="4" fill="none" opacity=".45" stroke-linecap="round"/>
</symbol>
<symbol id="s-strawberry" viewBox="0 0 100 100">
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round">
  <path d="M50 92 Q18 72 18 46 Q18 30 34 30 Q42 30 50 34 Q58 30 66 30 Q82 30 82 46 Q82 72 50 92Z" fill="currentColor"/>
  <path d="M50 30 V12" fill="none" stroke-linecap="round"/>
  <path d="M28 32 Q38 16 50 28 Q62 16 72 32 Q62 38 50 32 Q38 38 28 32Z" fill="#2DB36F"/>
 </g>
 <g fill="#FFF3B0"><ellipse cx="34" cy="48" rx="2" ry="3"/><ellipse cx="50" cy="46" rx="2" ry="3"/><ellipse cx="66" cy="48" rx="2" ry="3"/><ellipse cx="40" cy="62" rx="2" ry="3"/><ellipse cx="58" cy="62" rx="2" ry="3"/><ellipse cx="49" cy="76" rx="2" ry="3"/><ellipse cx="30" cy="58" rx="2" ry="3"/><ellipse cx="70" cy="58" rx="2" ry="3"/></g>
</symbol>
<symbol id="s-leaf" viewBox="0 0 100 100">
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round"><path d="M22 82 Q14 30 70 14 Q92 9 88 22 Q84 72 34 82Z" fill="currentColor"/><path d="M12 94 L30 76" fill="none" stroke-linecap="round"/></g>
 <path d="M28 76 Q52 50 80 22 M40 62 L36 46 M52 50 L48 34 M46 56 L64 56 M60 42 L76 42" stroke="#fff" stroke-width="3" opacity=".55" fill="none" stroke-linecap="round"/>
</symbol>
<symbol id="s-carrot" viewBox="0 0 100 100">
 <path d="M62 24 Q58 8 66 2 Q72 12 68 24Z M66 28 Q76 10 90 12 Q84 26 70 32Z M68 32 Q86 28 96 38 Q84 44 70 38Z" fill="#2DB36F" stroke="#17383F" stroke-width="3" stroke-linejoin="round"/>
 <path d="M58 24 Q70 26 72 36 Q74 44 66 52 L22 96 Q12 94 14 84 L48 30 Q52 22 58 24Z" fill="currentColor" stroke="#17383F" stroke-width="3" stroke-linejoin="round"/>
 <path d="M46 44 L56 48 M36 60 L44 64 M28 74 L34 77" stroke="#17383F" stroke-width="2.5" stroke-linecap="round" opacity=".5"/>
</symbol>
<symbol id="s-milk" viewBox="0 0 100 100">
 <g stroke="#17383F" stroke-width="3" stroke-linejoin="round"><path d="M24 10 H76 L70 90 Q69 95 63 95 H37 Q31 95 30 90Z" fill="#E4F2F8"/><path d="M27 34 H73 L69 88 Q68 92 63 92 H37 Q32 92 31 88Z" fill="currentColor"/></g>
 <path d="M34 18 L37 84" stroke="#fff" stroke-width="5" opacity=".75" stroke-linecap="round"/>
</symbol>
</defs></svg>`;

/* ---------- Koko ---------- */
function kokoMarkup() {
  return `<svg class="koko" viewBox="-30 -60 360 430" preserveAspectRatio="xMidYMax meet" data-mood="idle" aria-hidden="true" focusable="false">
  <g class="branch">
    <path d="M-28 340 Q60 328 150 336 T328 332" stroke="#8A5A33" stroke-width="16" fill="none" stroke-linecap="round"/>
    <path d="M36 333 Q20 306 -8 310 Q14 332 36 333Z" fill="#5DBB63"/><path d="M264 334 Q284 310 312 314 Q292 338 264 334Z" fill="#5DBB63"/>
  </g>
  <g class="bird">
    <g class="wear-back"></g>
    <g class="tail" stroke="#17383F" stroke-width="3" stroke-linejoin="round">
      <path d="M128 282 Q104 330 112 364 Q134 342 148 298Z" fill="#3A86FF"/><path d="M170 282 Q196 330 188 362 Q168 340 154 298Z" fill="#FFC93C"/><path d="M149 288 Q148 340 156 372 Q170 342 163 290Z" fill="#F2545B"/>
    </g>
    <g class="feet" fill="#FF9F1C" stroke="#17383F" stroke-width="3" stroke-linejoin="round"><path d="M120 306 Q118 326 104 336 H142 Q134 326 134 306Z"/><path d="M166 306 Q166 326 158 336 H196 Q182 326 180 306Z"/></g>
    <ellipse cx="150" cy="226" rx="84" ry="94" fill="#2DB36F" stroke="#17383F" stroke-width="3"/>
    <ellipse cx="150" cy="246" rx="54" ry="64" fill="#FFE08A"/>
    <path d="M122 238 q14 10 28 0 q14 10 28 0 M130 266 q10 8 20 0 q10 8 20 0" stroke="#F2C14E" stroke-width="5" fill="none" stroke-linecap="round"/>
    <g class="wing-l" stroke="#17383F" stroke-width="3" stroke-linejoin="round"><path d="M82 172 Q36 224 58 292 Q94 280 106 222 Q102 188 82 172Z" fill="#23985C"/><path d="M58 292 Q50 262 62 238 Q74 268 72 292Z" fill="#3A86FF"/></g>
    <g class="wing-r" stroke="#17383F" stroke-width="3" stroke-linejoin="round"><path d="M218 172 Q264 224 242 292 Q206 280 194 222 Q198 188 218 172Z" fill="#23985C"/><path d="M242 292 Q250 262 238 238 Q226 268 228 292Z" fill="#3A86FF"/></g>
    <g class="head">
      <g class="crest" stroke="#17383F" stroke-width="3" stroke-linejoin="round"><path d="M144 52 Q122 10 98 8 Q116 28 126 58Z" fill="#F2545B"/><path d="M158 54 Q186 16 214 16 Q194 36 176 62Z" fill="#FFC93C"/><path d="M148 50 Q148 -2 168 -20 Q172 14 166 52Z" fill="#FF9F1C"/></g>
      <circle cx="150" cy="114" r="74" fill="#2DB36F" stroke="#17383F" stroke-width="3"/>
      <ellipse cx="150" cy="124" rx="56" ry="48" fill="#6AD69D" opacity=".5"/>
      <circle cx="102" cy="142" r="12" fill="#FF8FA3" opacity=".75"/><circle cx="198" cy="142" r="12" fill="#FF8FA3" opacity=".75"/>
      <g class="eyes eyes-open"><circle cx="122" cy="106" r="22" fill="#fff" stroke="#17383F" stroke-width="3"/><circle cx="178" cy="106" r="22" fill="#fff" stroke="#17383F" stroke-width="3"/><circle cx="126" cy="110" r="11" fill="#17383F"/><circle cx="174" cy="110" r="11" fill="#17383F"/><circle cx="130" cy="105" r="4" fill="#fff"/><circle cx="178" cy="105" r="4" fill="#fff"/></g>
      <g class="eyes eyes-happy" stroke="#17383F" stroke-width="7" fill="none" stroke-linecap="round"><path d="M104 112 Q122 90 140 112"/><path d="M160 112 Q178 90 196 112"/></g>
      <g class="eyes eyes-closed" stroke="#17383F" stroke-width="6" fill="none" stroke-linecap="round"><path d="M104 106 Q122 120 140 106"/><path d="M160 106 Q178 120 196 106"/></g>
      <g class="eyes eyes-confused"><circle cx="122" cy="104" r="23" fill="#fff" stroke="#17383F" stroke-width="3"/><circle cx="180" cy="110" r="16" fill="#fff" stroke="#17383F" stroke-width="3"/><circle cx="116" cy="96" r="10" fill="#17383F"/><circle cx="184" cy="106" r="7.5" fill="#17383F"/><circle cx="119" cy="92" r="3.5" fill="#fff"/><path d="M98 70 Q120 56 144 70 M162 86 L200 92" stroke="#17383F" stroke-width="6" fill="none" stroke-linecap="round"/></g>
      <g class="eyes eyes-wow"><circle cx="122" cy="104" r="25" fill="#fff" stroke="#17383F" stroke-width="3"/><circle cx="178" cy="104" r="25" fill="#fff" stroke="#17383F" stroke-width="3"/><circle cx="122" cy="106" r="6.5" fill="#17383F"/><circle cx="178" cy="106" r="6.5" fill="#17383F"/></g>
      <g class="beak beak-closed" stroke="#17383F" stroke-width="3" stroke-linejoin="round"><path d="M132 150 Q150 170 168 150 Q150 160 132 150Z" fill="#DD7D0A"/><path d="M124 138 C124 120 176 120 176 138 C176 158 162 170 152 178 C150 166 140 158 128 152 C125 148 124 143 124 138Z" fill="#FF9F1C"/></g>
      <g class="beak beak-open" stroke="#17383F" stroke-width="3" stroke-linejoin="round"><ellipse cx="150" cy="160" rx="18" ry="14" fill="#7A2E2E"/><ellipse cx="150" cy="167" rx="9" ry="5" fill="#FF8FA3" stroke="none"/><path d="M130 160 Q150 194 170 160 Q150 174 130 160Z" fill="#DD7D0A"/><path d="M124 132 C124 114 176 114 176 132 C176 148 166 156 156 160 C152 152 140 150 128 146 C125 142 124 137 124 132Z" fill="#FF9F1C"/></g>
    </g>
    <g class="wear"></g>
    <g class="qmarks" fill="#17383F" style="font-family:var(--display);font-weight:700" direction="ltr"><text x="232" y="34" font-size="54">?</text><text x="270" y="2" font-size="36">?</text></g>
    <g class="zzz" fill="#E8EEFF" style="font-family:var(--display);font-weight:700" direction="ltr"><text x="222" y="40" font-size="40">Z</text><text x="254" y="8" font-size="30">z</text><text x="280" y="-18" font-size="22">z</text></g>
  </g>
</svg>`;
}

/* ---------- worlds ---------- */
// 1000x1000 drawings anchored to the bottom (xMidYMax slice): phones see the middle column, tablets see the full width.
const CLOUD = (x, y, s) => `<g class="cloud" style="--dx:${Math.round(40 + s * 30)}px"><g transform="translate(${x} ${y}) scale(${s})" fill="#fff"><ellipse cx="0" cy="0" rx="70" ry="34"/><ellipse cx="-46" cy="10" rx="44" ry="26"/><ellipse cx="50" cy="12" rx="48" ry="26"/><ellipse cx="10" cy="-22" rx="40" ry="30"/></g></g>`;
const FLOWER = (x, y, c, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 V36" stroke="#3E9B4F" stroke-width="5"/><g fill="${c}"><circle cx="0" cy="-12" r="9"/><circle cx="11" cy="-3" r="9"/><circle cx="7" cy="10" r="9"/><circle cx="-7" cy="10" r="9"/><circle cx="-11" cy="-3" r="9"/></g><circle r="7" fill="#FFE27A"/></g>`;
const TREE = (x, y, s, c1 = '#5DBB63', c2 = '#4AA857') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-16" y="-10" width="32" height="130" rx="10" fill="#9A6A42"/><circle cx="0" cy="-60" r="80" fill="${c2}"/><circle cx="-56" cy="-20" r="58" fill="${c1}"/><circle cx="58" cy="-26" r="60" fill="${c1}"/><circle cx="0" cy="-96" r="62" fill="${c1}"/><circle cx="-30" cy="-110" r="14" fill="#fff" opacity=".18"/></g>`;
const sky = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="1000" height="1000" fill="url(#${id})"/>`;
const SUN = (x, y, r = 76) => `<g class="sun"><circle cx="${x}" cy="${y}" r="${r * 1.9}" fill="#FFF3B8" opacity=".55"/><circle cx="${x}" cy="${y}" r="${r * 1.35}" fill="#FFE98A" opacity=".7"/><circle cx="${x}" cy="${y}" r="${r}" fill="#FFD84D"/></g>`;

const WORLDS = {
  sky: () => `${sky('gs', '#9EDCF2', '#ECF8F0')}${SUN(330, 250, 70)}${CLOUD(640, 190, 1)}${CLOUD(420, 400, .7)}${CLOUD(820, 440, .8)}${CLOUD(160, 520, .6)}
    <path d="M0 700 Q180 620 380 680 Q560 730 760 650 Q900 600 1000 640 V1000 H0Z" fill="#C3E9C7"/>
    ${TREE(120, 730, 1.15)}${TREE(900, 760, 1)}
    <path d="M0 800 Q250 760 500 790 Q760 820 1000 780 V1000 H0Z" fill="#9AD9A6"/>
    ${FLOWER(300, 850, '#FF8FC7')}${FLOWER(380, 900, '#FFFFFF', .9)}${FLOWER(640, 870, '#F2545B')}${FLOWER(700, 930, '#9B5DE5', .9)}${FLOWER(540, 960, '#FFC93C', .8)}`,

  farm: () => `${sky('gf', '#AFE3F5', '#FFF4D6')}${SUN(300, 230, 72)}${CLOUD(560, 170, .9)}${CLOUD(780, 330, .7)}${CLOUD(140, 360, .6)}
    <path d="M0 640 Q200 560 420 620 Q620 680 820 600 Q920 570 1000 590 V1000 H0Z" fill="#BDE3A6"/>
    <path d="M0 700 Q260 650 520 690 Q780 730 1000 670 V1000 H0Z" fill="#A3D68F"/>
    <g transform="translate(610 520)">
      <path d="M0 80 L90 10 L180 80 V250 H0Z" fill="#E4573D"/><path d="M-14 86 L90 2 L194 86" fill="none" stroke="#8E2F22" stroke-width="18" stroke-linejoin="round"/>
      <rect x="55" y="140" width="70" height="110" fill="#FFF6E8"/><path d="M55 140 L125 250 M125 140 L55 250" stroke="#E4573D" stroke-width="9"/>
      <rect x="72" y="70" width="36" height="34" rx="4" fill="#FFF6E8"/><path d="M0 250 H180" stroke="#8E2F22" stroke-width="6"/>
    </g>
    <g transform="translate(830 560)"><rect x="0" y="0" width="70" height="210" rx="34" fill="#C9D6DF"/><path d="M0 60 H70 M0 110 H70 M0 160 H70" stroke="#AEBDC8" stroke-width="5"/><path d="M-6 34 Q35 -24 76 34Z" fill="#8E2F22"/></g>
    <g transform="translate(210 700)"><ellipse cx="0" cy="40" rx="78" ry="16" fill="#8CC57A"/><path d="M-70 40 Q-60 -40 0 -46 Q60 -40 70 40Z" fill="#F2C14E"/><path d="M-40 0 Q0 -14 40 0 M-54 22 Q0 6 54 22" stroke="#DDA735" stroke-width="5" fill="none"/></g>
    <g stroke="#B98B5A" stroke-width="12" stroke-linecap="round">${Array.from({ length: 18 }, (_, i) => `<path d="M${i * 60 + 10} 760 V700"/>`).join('')}<path d="M0 716 H1000 M0 744 H1000" stroke-width="9"/></g>
    <path d="M0 790 Q260 760 500 780 Q760 800 1000 770 V1000 H0Z" fill="#8ACB74"/>
    ${FLOWER(330, 860, '#FFFFFF', .8)}${FLOWER(690, 880, '#FFC93C', .8)}${FLOWER(470, 940, '#FF8FC7', .7)}`,

  bedroom: () => `<defs><pattern id="pstar" width="120" height="120" patternUnits="userSpaceOnUse"><path d="M30 18 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2Z" fill="#FFE27A" opacity=".55"/><circle cx="90" cy="80" r="5" fill="#fff" opacity=".7"/></pattern>
      <linearGradient id="gb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E7E1FF"/><stop offset="1" stop-color="#F8F3FF"/></linearGradient></defs>
    <rect width="1000" height="1000" fill="url(#gb)"/><rect width="1000" height="780" fill="url(#pstar)"/>
    <g transform="translate(270 200)"><rect x="-14" y="-14" width="228" height="236" rx="16" fill="#fff"/><rect width="200" height="208" rx="8" fill="#BDE8F5"/>${CLOUD(110, 90, .55)}<path d="M100 0 V208 M0 104 H200" stroke="#fff" stroke-width="12"/>
      <path d="M-40 -30 Q-10 100 -40 250 H20 Q40 100 20 -30Z" fill="#FF9BB3"/><path d="M240 -30 Q210 100 240 250 H180 Q160 100 180 -30Z" fill="#FF9BB3"/><rect x="-50" y="-44" width="300" height="18" rx="9" fill="#B07B4F"/></g>
    <g transform="translate(560 260)"><rect x="-8" y="-8" width="116" height="96" rx="10" fill="#FFC93C"/><rect width="100" height="80" rx="6" fill="#FFF8E8"/><circle cx="34" cy="40" r="16" fill="#3A86FF" opacity=".7"/><path d="M50 70 L72 34 L94 70Z" fill="#2DB36F" opacity=".75"/></g>
    <g transform="translate(700 380)"><rect width="190" height="400" rx="14" fill="#C98E5A"/><rect x="14" y="16" width="76" height="340" rx="8" fill="#DDA673"/><rect x="100" y="16" width="76" height="340" rx="8" fill="#DDA673"/><circle cx="80" cy="190" r="8" fill="#8A5A33"/><circle cx="110" cy="190" r="8" fill="#8A5A33"/><rect x="20" y="370" width="22" height="30" fill="#8A5A33"/><rect x="148" y="370" width="22" height="30" fill="#8A5A33"/></g>
    <g transform="translate(110 560)"><rect width="150" height="220" rx="12" fill="#7CC8F0"/><rect x="12" y="20" width="126" height="56" rx="6" fill="#A6DCF6"/><rect x="12" y="90" width="126" height="56" rx="6" fill="#A6DCF6"/><rect x="12" y="160" width="126" height="48" rx="6" fill="#A6DCF6"/><circle cx="75" cy="48" r="7" fill="#fff"/><circle cx="75" cy="118" r="7" fill="#fff"/><circle cx="75" cy="184" r="7" fill="#fff"/><g transform="translate(40 -50) scale(.9)"><circle r="34" fill="#F2545B"/><path d="M-34 0 H34 M0 -34 V34" stroke="#fff" stroke-width="6"/></g></g>
    <rect y="770" width="1000" height="230" fill="#E8C29A"/><g stroke="#D7AE84" stroke-width="5">${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 120 + 40} 770 V1000"/>`).join('')}</g>
    <ellipse cx="500" cy="880" rx="320" ry="70" fill="#FFB8C9"/><ellipse cx="500" cy="880" rx="250" ry="48" fill="none" stroke="#fff" stroke-width="8" stroke-dasharray="20 18" opacity=".8"/>`,

  kitchen: () => `${sky('gk', '#D8F3EA', '#EEFAF5')}
    <g opacity=".9"><rect y="470" width="1000" height="240" fill="#fff"/><g stroke="#CDEBE0" stroke-width="5">${Array.from({ length: 17 }, (_, i) => `<path d="M${i * 60} 470 V710"/>`).join('')}${Array.from({ length: 4 }, (_, i) => `<path d="M0 ${470 + i * 60} H1000"/>`).join('')}</g></g>
    <g transform="translate(80 200)"><rect x="-12" y="-12" width="204" height="194" rx="14" fill="#fff"/><rect width="180" height="170" rx="8" fill="#AFE3F5"/>${SUN(130, 50, 22)}<path d="M90 0 V170 M0 85 H180" stroke="#fff" stroke-width="10"/><rect x="-20" y="170" width="220" height="16" rx="8" fill="#B07B4F"/><g transform="translate(40 120)"><rect x="-22" y="20" width="44" height="34" rx="6" fill="#E4573D"/><circle cy="0" r="26" fill="#5DBB63"/><circle cx="-18" cy="10" r="16" fill="#4AA857"/><circle cx="18" cy="8" r="16" fill="#4AA857"/></g></g>
    <g transform="translate(300 330)"><rect x="0" y="0" width="420" height="16" rx="8" fill="#B07B4F"/>
      <g transform="translate(40 -70)"><rect width="56" height="70" rx="10" fill="#FFC93C"/><rect x="-4" y="-12" width="64" height="16" rx="6" fill="#F2545B"/></g>
      <g transform="translate(130 -86)"><rect width="60" height="86" rx="12" fill="#9CC5FF"/><rect x="-4" y="-14" width="68" height="18" rx="6" fill="#3A86FF"/></g>
      <g transform="translate(230 -60)"><rect width="52" height="60" rx="10" fill="#FFB8C9"/><rect x="-4" y="-12" width="60" height="16" rx="6" fill="#9B5DE5"/></g>
      <g transform="translate(330 -50)"><path d="M0 50 Q-6 0 30 0 Q66 0 60 50Z" fill="#fff"/><path d="M8 50 Q30 60 52 50" stroke="#E4573D" stroke-width="6" fill="none"/></g></g>
    <g transform="translate(760 160)"><circle cx="70" cy="70" r="70" fill="#fff"/><circle cx="70" cy="70" r="58" fill="#FFF8E8"/><path d="M70 30 V70 L98 86" stroke="#17383F" stroke-width="8" stroke-linecap="round" fill="none"/></g>
    <rect y="700" width="1000" height="90" fill="#E3B985"/><rect y="690" width="1000" height="22" rx="6" fill="#F3D6A8"/>
    <g stroke="#D3A774" stroke-width="5">${Array.from({ length: 6 }, (_, i) => `<path d="M${i * 180 + 90} 712 V790"/>`).join('')}</g>
    <g fill="#B07B4F">${Array.from({ length: 6 }, (_, i) => `<rect x="${i * 180 + 76}" y="740" width="28" height="8" rx="4"/>`).join('')}</g>
    <rect y="790" width="1000" height="210" fill="#F6E7C8"/><g fill="#EEDAB1">${Array.from({ length: 20 }, (_, i) => `<rect x="${(i % 10) * 100 + (Math.floor(i / 10) ? 50 : 0)}" y="${790 + Math.floor(i / 10) * 100}" width="50" height="100"/>`).join('')}</g>`,

  garden: () => `${sky('gg', '#A9E2F5', '#F2FBF1')}${SUN(760, 220, 60)}${CLOUD(260, 190, .8)}${CLOUD(560, 320, .6)}
    <g fill="none" stroke-width="34" opacity=".55" transform="translate(500 820)">${['#F2545B', '#FF9F1C', '#FFD43B', '#2DB36F', '#3A86FF', '#9B5DE5'].map((c, i) => `<path d="M${-(420 - i * 34)} 0 A${420 - i * 34} ${420 - i * 34} 0 0 1 ${420 - i * 34} 0" stroke="${c}"/>`).join('')}</g>
    <path d="M0 720 Q220 660 480 700 Q760 740 1000 690 V1000 H0Z" fill="#B6E3A4"/>
    <g fill="#7CC36E">${[[110, 760, 70], [190, 740, 54], [880, 750, 72], [800, 770, 50]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
    <path d="M0 790 Q260 770 500 785 Q760 800 1000 775 V1000 H0Z" fill="#94D483"/>
    ${FLOWER(290, 820, '#F2545B')}${FLOWER(350, 870, '#FFD43B', .9)}${FLOWER(420, 830, '#3A86FF', .8)}${FLOWER(590, 840, '#9B5DE5')}${FLOWER(650, 890, '#FF9F1C', .9)}${FLOWER(720, 830, '#FF8FC7', .8)}${FLOWER(500, 930, '#FFFFFF', .8)}`,

  meadow: () => `${sky('gm', '#8FD8F5', '#F4FBEA')}${SUN(700, 260, 90)}${CLOUD(300, 200, .8)}${CLOUD(560, 120, .5)}
    <path d="M0 660 Q300 580 560 640 Q800 700 1000 620 V1000 H0Z" fill="#B9E7A6"/>
    ${TREE(140, 740, 1.2, '#7CCB6B', '#62B556')}${TREE(870, 720, 1.1, '#7CCB6B', '#62B556')}
    <path d="M0 780 Q300 740 520 770 Q780 800 1000 760 V1000 H0Z" fill="#9BDB86"/>
    <g fill="#7CC36E">${Array.from({ length: 14 }, (_, i) => `<path d="M${i * 75 + 20} 860 l10 -34 10 34 10 -26 8 26Z"/>`).join('')}</g>
    <g class="butterfly" transform="translate(380 520)"><path d="M0 0 Q-30 -34 -36 -6 Q-30 14 0 0 Q30 14 36 -6 Q30 -34 0 0Z" fill="#FF8FC7" stroke="#17383F" stroke-width="3"/><path d="M0 -10 V12" stroke="#17383F" stroke-width="4" stroke-linecap="round"/></g>
    <g class="butterfly b2" transform="translate(640 470) scale(.8)"><path d="M0 0 Q-30 -34 -36 -6 Q-30 14 0 0 Q30 14 36 -6 Q30 -34 0 0Z" fill="#FFD43B" stroke="#17383F" stroke-width="3"/><path d="M0 -10 V12" stroke="#17383F" stroke-width="4" stroke-linecap="round"/></g>`,

  night: () => `${sky('gn', '#18234D', '#3C4C8E')}
    <g fill="#fff">${[[120, 140, 3], [260, 90, 2], [380, 210, 3.5], [520, 120, 2.5], [600, 330, 2], [760, 110, 3], [880, 220, 2.5], [940, 80, 2], [180, 330, 2.5], [450, 400, 2], [820, 420, 3], [300, 470, 2], [680, 520, 2.5], [90, 520, 2], [560, 40, 2]].map(([x, y, r], i) => `<circle class="star" style="animation-delay:${(i % 5) * .7}s" cx="${x}" cy="${y}" r="${r * 1.6}"/>`).join('')}</g>
    <g transform="translate(660 250)"><circle r="120" fill="#FFF6C8" opacity=".12"/><circle r="70" fill="#FFF3B0"/><circle cx="-30" cy="-14" r="66" fill="#26336A"/></g>
    <path d="M0 700 Q240 620 480 680 Q720 740 1000 650 V1000 H0Z" fill="#26386A"/>
    ${TREE(130, 740, 1.1, '#2B4A6E', '#24405F')}${TREE(890, 760, 1, '#2B4A6E', '#24405F')}
    <path d="M0 800 Q260 770 500 790 Q760 810 1000 780 V1000 H0Z" fill="#1E2E58"/>
    <g fill="#FFE98A">${[[300, 760], [620, 720], [760, 840], [420, 880]].map(([x, y], i) => `<circle class="firefly" style="animation-delay:${i * 1.1}s" cx="${x}" cy="${y}" r="6"/>`).join('')}</g>`
};

if (typeof module !== 'undefined') module.exports = { SPRITE, WORLDS, kokoMarkup, SYM_COLOR };
