/* ============================================================
   Doğan Optik — ortak veri katmanı (DEMO)
   Tüm veriler tarayıcının localStorage'ında tutulur; sayfa
   yenilense de kalır ama yalnızca bu tarayıcıda geçerlidir.
   Gerçek sürümde bu katman Supabase'e bağlanacak.
   ============================================================ */

const DO_KEY = {
  kullanicilar: 'do_kullanicilar',
  oturum:       'do_oturum',
  sepet:        'do_sepet',
  siparisler:   'do_siparisler',
  ayarlar:      'do_ayarlar',
  epostalar:    'do_epostalar',
  urunAyar:     'do_urun_ayar',
  tohum:        'do_tohum_v1'
};

function doOku(anahtar, varsayilan){
  try{ const v = localStorage.getItem(anahtar); return v ? JSON.parse(v) : varsayilan; }
  catch(e){ return varsayilan; }
}
function doYaz(anahtar, deger){ localStorage.setItem(anahtar, JSON.stringify(deger)); }

/* ---------- Ürün kataloğu ---------- */
const TIP_AD = {
  gunluk:'Günlük Lens', onbes:'15 Günlük', aylik:'Aylık Lens', renkli:'Renkli Lens',
  torik:'Torik / Astigmat', multifokal:'Multifokal', bakim:'Bakım Ürünleri', gozluk:'Optik Gözlük'
};
const TIP_DAMLA = {
  gunluk:['linear-gradient(160deg,#2E86AB,#123C49)','G'],
  onbes:['linear-gradient(160deg,#4C9F70,#1E6B37)','15'],
  aylik:['linear-gradient(160deg,#1C5566,#0B1721)','A'],
  renkli:['var(--lens-grad)','R'],
  torik:['linear-gradient(160deg,#7A2E3A,#4A1B23)','T'],
  multifokal:['linear-gradient(160deg,#5B6B75,#2C3A44)','M'],
  bakim:['linear-gradient(160deg,#8FB8C9,#4A7A8C)','B']
};

const URUNLER = [
  {id:'oasys',           marka:'Johnson & Johnson', ad:'Acuvue Oasys',              not:'Aylık · 6 lens · Hydraclear Plus',   tip:'aylik',      kapak:'linear-gradient(180deg,#1D5B8A,#123C49)', yazi:'ACUVUE<br>OASYS',            fiyat:1099.90, cokFiyat:1049.90, cokAdet:4, etiket:'cok-satan', lens:true},
  {id:'oasys-toric',     marka:'Johnson & Johnson', ad:'Acuvue Oasys Toric',        not:'Aylık · Astigmatlı · 6 lens',        tip:'torik',      kapak:'linear-gradient(180deg,#7A2E3A,#4A1B23)', yazi:'OASYS<br>TORIC',             fiyat:1529.90, cokFiyat:1489.90, cokAdet:4, etiket:'indirim',   lens:true},
  {id:'oasys-1day',      marka:'Johnson & Johnson', ad:'Acuvue Oasys 1-Day',        not:'Günlük · 30 lens · HydraLuxe',       tip:'gunluk',     kapak:'linear-gradient(180deg,#8FB8C9,#4A7A8C)', yazi:'OASYS 1-DAY<br>HYDRALUXE',   fiyat:1179.90, cokFiyat:1099.90, cokAdet:6, etiket:'yeni',      lens:true},
  {id:'airoptix',        marka:'Alcon',             ad:'Air Optix Plus HydraGlyde', not:'Aylık · 3 lens · SmartShield',       tip:'aylik',      kapak:'linear-gradient(180deg,#2E86AB,#1D5B8A)', yazi:'AIR OPTIX<br>HYDRAGLYDE',    fiyat:1099.90, cokFiyat:1089.90, cokAdet:4,                     lens:true},
  {id:'ultra',           marka:'Bausch + Lomb',     ad:'Bausch+Lomb ULTRA',         not:'Aylık · 6 lens · MoistureSeal',      tip:'aylik',      kapak:'linear-gradient(180deg,#4C9F70,#1E6B37)', yazi:'BAUSCH+LOMB<br>ULTRA',       fiyat:999.90,  cokFiyat:989.90,  cokAdet:4,                     lens:true},
  {id:'dailies',         marka:'Alcon',             ad:'Dailies Aqua Comfort Plus', not:'Günlük · 30 lens',                   tip:'gunluk',     kapak:'linear-gradient(180deg,#1C5566,#0B1721)', yazi:'DAILIES<br>AQUA COMFORT',    fiyat:979.90,  cokFiyat:921.90,  cokAdet:6, etiket:'cok-satan', lens:true},
  {id:'colors',          marka:'Alcon',             ad:'Air Optix Colors',          not:'Aylık · Renkli · 2 lens',            tip:'renkli',     kapak:'var(--lens-grad)',                        yazi:'AIR OPTIX<br>COLORS',        fiyat:799.90,  cokFiyat:784.90,  cokAdet:4,                     lens:true},
  {id:'purevision',      marka:'Bausch + Lomb',     ad:'PureVision 2 HD',           not:'Aylık · 6 lens · HD Optik',          tip:'aylik',      kapak:'linear-gradient(180deg,#5B6B75,#2C3A44)', yazi:'PUREVISION<br>2 HD',         fiyat:1189.90, cokFiyat:1109.90, cokAdet:4,                     lens:true},
  {id:'biofinity',       marka:'CooperVision',      ad:'Biofinity',                 not:'Aylık · 3 lens · Aquaform',          tip:'aylik',      kapak:'linear-gradient(180deg,#2C7A5B,#123C49)', yazi:'BIOFINITY',                  fiyat:899.90,  cokFiyat:869.90,  cokAdet:4,                     lens:true},
  {id:'biofinity-toric', marka:'CooperVision',      ad:'Biofinity Toric',           not:'Aylık · Astigmatlı · 3 lens',        tip:'torik',      kapak:'linear-gradient(180deg,#1E6B37,#123C49)', yazi:'BIOFINITY<br>TORIC',         fiyat:1389.90, cokFiyat:1349.90, cokAdet:4,                     lens:true},
  {id:'biofinity-multi', marka:'CooperVision',      ad:'Biofinity Multifocal',      not:'Aylık · Uzak-Yakın · 3 lens',        tip:'multifokal', kapak:'linear-gradient(180deg,#6B4A2E,#3A2814)', yazi:'BIOFINITY<br>MULTIFOCAL',    fiyat:1589.90, cokFiyat:1539.90, cokAdet:4,                     lens:true},
  {id:'soflens',         marka:'Bausch + Lomb',     ad:'SofLens 38',                not:'15 Günlük · 6 lens',                 tip:'onbes',      kapak:'linear-gradient(180deg,#8A5215,#4A2E0E)', yazi:'SOFLENS<br>38',              fiyat:749.90,  cokFiyat:729.90,  cokAdet:4,                     lens:true},
  {id:'freshlook',       marka:'Alcon',             ad:'FreshLook Colorblends',     not:'Aylık · Renkli · 2 lens',            tip:'renkli',     kapak:'linear-gradient(180deg,#B3392E,#6B1F18)', yazi:'FRESHLOOK<br>COLORBLENDS',   fiyat:619.90,  cokFiyat:599.90,  cokAdet:4,                     lens:true},
  {id:'renu',            marka:'Bausch + Lomb',     ad:'ReNu MPS Solüsyon 360ml',   not:'Bakım · Çok amaçlı solüsyon',        tip:'bakim',      kapak:'linear-gradient(180deg,#4C9F70,#1E6B37)', yazi:'RENU<br>MPS 360',            fiyat:289.90,  cokFiyat:269.90,  cokAdet:3,                     lens:false},
  {id:'optifree',        marka:'Alcon',             ad:'Opti-Free Puremoist 300ml', not:'Bakım · Çok amaçlı solüsyon',        tip:'bakim',      kapak:'linear-gradient(180deg,#1D5B8A,#0B1721)', yazi:'OPTI-FREE<br>PUREMOIST',     fiyat:319.90,  cokFiyat:299.90,  cokAdet:3,                     lens:false},
  {id:'lenskabi',        marka:'Doğan Optik',       ad:'Lens Kabı + Pens Seti',     not:'Bakım · Antibakteriyel',             tip:'bakim',      kapak:'linear-gradient(180deg,#5B6B75,#2C3A44)', yazi:'LENS<br>KABI SETİ',          fiyat:89.90,                                                    lens:false},
  /* --- GÖZLÜK MODÜLÜ (askıda; Ayarlar'dan açılır) --- */
  {id:'pera',            marka:'Doğan Collection',  ad:'Pera Titanyum',             not:'Optik Gözlük · Titanyum çerçeve',    tip:'gozluk',     kapak:'', yazi:'', fiyat:3490, lens:false},
  {id:'cihangir',        marka:'Lunor Heritage',    ad:'Cihangir Round',            not:'Optik Gözlük · Asetat çerçeve',      tip:'gozluk',     kapak:'', yazi:'', fiyat:5240, lens:false}
];

function urunGetir(id){ return URUNLER.find(u => u.id === id); }

/* Admin'de yapılan fiyat / aktiflik değişikliklerini katalogla birleştir */
function urunEfektif(u){
  const ayar = doOku(DO_KEY.urunAyar, {})[u.id] || {};
  return Object.assign({}, u, ayar);
}
function urunAktifMi(u){
  const ayar = doOku(DO_KEY.urunAyar, {})[u.id] || {};
  return ayar.aktif !== false;
}

/* ---------- Biçimlendirme ---------- */
function paraTL(n){
  return '₺' + Number(n).toLocaleString('tr-TR', {minimumFractionDigits:2, maximumFractionDigits:2});
}
const AYLAR_TR = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];
const AYLAR_UZUN = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
function tarihTR(iso){
  const t = new Date(iso + (iso.length === 10 ? 'T12:00:00' : ''));
  return `${t.getDate()} ${AYLAR_TR[t.getMonth()]} ${t.getFullYear()}`;
}
function tarihUzunTR(iso){
  const t = new Date(iso + (iso.length === 10 ? 'T12:00:00' : ''));
  return `${AYLAR_UZUN[t.getMonth()]} ${t.getFullYear()}`;
}
function suAnEtiketi(){
  const t = new Date();
  return `${t.getDate()} ${AYLAR_TR[t.getMonth()]} · ${String(t.getHours()).padStart(2,'0')}:${String(t.getMinutes()).padStart(2,'0')}`;
}
function bugunISO(){
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
}
function bassHarfler(ad, soyad){
  return ((ad||'?')[0] + (soyad||' ')[0]).toUpperCase().replace(' ','');
}
function avatarRengi(eposta){
  const renkler = ['var(--petrol)','var(--mavi)','var(--amber-koyu)','#7A2E3A','#4C9F70','#2C3A44'];
  let h = 0; for(const c of (eposta||'')) h = (h*31 + c.charCodeAt(0)) % 997;
  return renkler[h % renkler.length];
}

/* SPH (numara) seçenekleri: Plano, -0.50 → -8.00 ve +0.50 → +4.00 */
function sphSecenekleri(){
  const dizi = ['0.00'];
  for(let d = -0.5;  d >= -8; d -= 0.25) dizi.push(d.toFixed(2));
  for(let d = 0.5;   d <= 4;  d += 0.25) dizi.push('+' + d.toFixed(2));
  return dizi;
}

/* ---------- Fiyat hesabı ---------- */
function birimFiyat(urun, adet){
  const u = urunEfektif(urun);
  return (u.cokFiyat && u.cokAdet && adet >= u.cokAdet) ? u.cokFiyat : u.fiyat;
}
function sepetAraToplam(sepet){
  return sepet.reduce((t, s) => {
    const u = urunGetir(s.id); if(!u) return t;
    return t + birimFiyat(u, s.adet) * s.adet;
  }, 0);
}

/* ---------- Kullanıcı & oturum ---------- */
function kullanicilar(){ return doOku(DO_KEY.kullanicilar, []); }
function kullaniciBul(eposta){
  return kullanicilar().find(k => k.eposta.toLowerCase() === (eposta||'').toLowerCase());
}
function kullaniciKaydet(k){
  const liste = kullanicilar();
  const i = liste.findIndex(x => x.eposta.toLowerCase() === k.eposta.toLowerCase());
  if(i >= 0) liste[i] = k; else liste.push(k);
  doYaz(DO_KEY.kullanicilar, liste);
}
function oturumKullanici(){
  const e = doOku(DO_KEY.oturum, null);
  return e ? kullaniciBul(e) : null;
}
function oturumAc(eposta){ doYaz(DO_KEY.oturum, eposta); }
function oturumKapat(){ localStorage.removeItem(DO_KEY.oturum); }

/* ---------- Siparişler ---------- */
function siparisler(){ return doOku(DO_KEY.siparisler, []); }
function siparisKaydet(s){
  const liste = siparisler();
  const i = liste.findIndex(x => x.no === s.no);
  if(i >= 0) liste[i] = s; else liste.push(s);
  doYaz(DO_KEY.siparisler, liste);
}
function siparisNoUret(){
  const enB = siparisler().reduce((m, s) => Math.max(m, parseInt(s.no, 10) || 0), 5204);
  return String(enB + 1).padStart(5, '0');
}
function musteriSiparisleri(eposta){
  return siparisler()
    .filter(s => s.eposta.toLowerCase() === (eposta||'').toLowerCase())
    .sort((a, b) => a.tarih < b.tarih ? -1 : 1);
}
function siparisKacinci(sip){
  const liste = musteriSiparisleri(sip.eposta);
  const i = liste.findIndex(s => s.no === sip.no);
  return i >= 0 ? i + 1 : null;
}
function siparisUrunOzeti(sip){
  return sip.urunler.map(su => {
    const u = urunGetir(su.id);
    return `${u ? u.ad : su.id} ×${su.adet}`;
  }).join(' + ');
}

/* ---------- E-posta günlüğü (demo: gerçekten gönderilmez) ---------- */
function epostaKaydet(kime, konu, tip){
  const liste = doOku(DO_KEY.epostalar, []);
  liste.push({zaman: new Date().toISOString(), etiket: suAnEtiketi(), kime, konu, tip});
  doYaz(DO_KEY.epostalar, liste);
}

/* ---------- Ayarlar ---------- */
const AYAR_VARSAYILAN = {
  gozluk: false,
  kargoEsik: 500,
  kargoUcret: 49.90,
  serit: 'Tüm lenslerde resmi ödeme kanallarıyla <b>6 aya varan taksit</b> · 500₺ üzeri kargo bedava',
  adminSifre: 'admin',
  hatirlatmaGun: 25,
  kategoriSira: ['gunluk','onbes','aylik','renkli','torik','multifokal','bakim']
};
function ayarlar(){ return Object.assign({}, AYAR_VARSAYILAN, doOku(DO_KEY.ayarlar, {})); }
function ayarKaydet(kismi){
  doYaz(DO_KEY.ayarlar, Object.assign({}, doOku(DO_KEY.ayarlar, {}), kismi));
}
function gozlukUygula(){
  document.body.classList.toggle('gozluk-acik', !!ayarlar().gozluk);
}

/* ---------- Örnek veri tohumu (ilk açılışta bir kez) ---------- */
function doTohumla(){
  if(doOku(DO_KEY.tohum, false)) return;

  doYaz(DO_KEY.kullanicilar, [
    {eposta:'ayse@ornek.com',   sifre:'demo1234', ad:'Ayşe',   soyad:'Yılmaz', telefon:'0532 555 41 41', sehir:'İstanbul / Beşiktaş', adres:'Sinanpaşa Mah. Işık Sk. No:12 D:5', kayit:'2025-03-14', dogrulandi:true,  bulten:true,  recete:{sag:'-2.25', sol:'-2.25', bc:'8.4', dia:'14.0'}},
    {eposta:'mehmet@ornek.com', sifre:'demo1234', ad:'Mehmet', soyad:'Kaya',   telefon:'0505 555 18 18', sehir:'Ankara / Çankaya',    adres:'Birlik Mah. 448. Cad. No:8/3',      kayit:'2026-02-02', dogrulandi:true,  bulten:true,  recete:{sag:'-1.75', sol:'-2.00', bc:'8.6', dia:'14.2'}},
    {eposta:'zeynep@ornek.com', sifre:'demo1234', ad:'Zeynep', soyad:'Demir',  telefon:'',               sehir:'İzmir / Karşıyaka',   adres:'Bostanlı Mah. Cengiz Sk. No:3',     kayit:'2026-06-28', dogrulandi:true,  bulten:false, recete:{sag:'-3.00', sol:'-2.75', bc:'8.4', dia:'14.0'}},
    {eposta:'selin@ornek.com',  sifre:'demo1234', ad:'Selin',  soyad:'Öztürk', telefon:'0533 555 76 76', sehir:'Bursa / Nilüfer',     adres:'Odunluk Mah. Lefkoşe Cad. No:21',   kayit:'2025-10-11', dogrulandi:true,  bulten:true,  recete:{sag:'-1.50', sol:'-1.25', bc:'8.5', dia:'14.2'}},
    {eposta:'emre@ornek.com',   sifre:'demo1234', ad:'Emre',   soyad:'Arslan', telefon:'',               sehir:'',                    adres:'',                                   kayit:'2026-06-19', dogrulandi:false, bulten:false, recete:null}
  ]);

  doYaz(DO_KEY.siparisler, [
    /* Selin — 5 sipariş */
    {no:'05204', tarih:'2026-07-04', eposta:'selin@ornek.com',  urunler:[{id:'oasys-1day', adet:6, sag:'-1.50', sol:'-1.25'}],                              tutar:6599.40, odeme:'Kredi kartı · 3 taksit', durum:'yeni'},
    {no:'05172', tarih:'2026-06-19', eposta:'selin@ornek.com',  urunler:[{id:'oasys-toric', adet:2, sag:'-1.50', sol:'-1.25'}],                             tutar:3059.80, odeme:'Kredi kartı · 2 taksit', durum:'kargolandi', kargoZaman:'19 Haz · 16:40', teslim:false},
    {no:'04220', tarih:'2026-04-20', eposta:'selin@ornek.com',  urunler:[{id:'oasys-toric', adet:2, sag:'-1.50', sol:'-1.25'}],                             tutar:3059.80, odeme:'Tek çekim',              durum:'kargolandi', kargoZaman:'21 Nis · 10:12', teslim:true},
    {no:'02911', tarih:'2026-02-08', eposta:'selin@ornek.com',  urunler:[{id:'oasys-toric', adet:1, sag:'-1.50', sol:'-1.25'}, {id:'renu', adet:1}],        tutar:1819.80, odeme:'Tek çekim',              durum:'kargolandi', kargoZaman:'9 Şub · 11:30',  teslim:true},
    {no:'01102', tarih:'2025-10-11', eposta:'selin@ornek.com',  urunler:[{id:'oasys-toric', adet:1, sag:'-1.50', sol:'-1.25'}],                             tutar:1529.90, odeme:'Tek çekim',              durum:'kargolandi', kargoZaman:'12 Eki · 09:05', teslim:true},
    /* Ayşe — 6 sipariş */
    {no:'05203', tarih:'2026-07-01', eposta:'ayse@ornek.com',   urunler:[{id:'oasys', adet:4, sag:'-2.25', sol:'-2.25'}],                                   tutar:4199.60, odeme:'Kredi kartı · 3 taksit', durum:'hazirlaniyor'},
    {no:'04102', tarih:'2026-04-03', eposta:'ayse@ornek.com',   urunler:[{id:'oasys', adet:2, sag:'-2.25', sol:'-2.25'}],                                   tutar:2199.80, odeme:'Tek çekim',              durum:'kargolandi', kargoZaman:'4 Nis · 11:20',  teslim:true},
    {no:'01088', tarih:'2026-01-12', eposta:'ayse@ornek.com',   urunler:[{id:'oasys', adet:2, sag:'-2.25', sol:'-2.25'}, {id:'renu', adet:1}],              tutar:2489.70, odeme:'Kredi kartı · 2 taksit', durum:'kargolandi', kargoZaman:'13 Oca · 09:15', teslim:true},
    {no:'00941', tarih:'2025-10-09', eposta:'ayse@ornek.com',   urunler:[{id:'oasys', adet:2, sag:'-2.25', sol:'-2.25'}],                                   tutar:2199.80, odeme:'Tek çekim',              durum:'kargolandi', kargoZaman:'10 Eki · 15:44', teslim:true},
    {no:'00621', tarih:'2025-07-02', eposta:'ayse@ornek.com',   urunler:[{id:'oasys', adet:1, sag:'-2.25', sol:'-2.25'}],                                   tutar:1099.90, odeme:'Tek çekim',              durum:'kargolandi', kargoZaman:'3 Tem · 10:20',  teslim:true},
    {no:'00318', tarih:'2025-03-20', eposta:'ayse@ornek.com',   urunler:[{id:'oasys', adet:1, sag:'-2.25', sol:'-2.25'}, {id:'renu', adet:1}],              tutar:1389.80, odeme:'Tek çekim',              durum:'kargolandi', kargoZaman:'21 Mar · 13:10', teslim:true},
    /* Mehmet — 3 sipariş */
    {no:'05202', tarih:'2026-07-01', eposta:'mehmet@ornek.com', urunler:[{id:'airoptix', adet:2, sag:'-1.75', sol:'-2.00'}],                                tutar:2199.80, odeme:'Tek çekim',              durum:'hazirlaniyor'},
    {no:'05188', tarih:'2026-06-24', eposta:'mehmet@ornek.com', urunler:[{id:'airoptix', adet:2, sag:'-1.75', sol:'-2.00'}],                                tutar:2199.80, odeme:'Tek çekim',              durum:'kargolandi', kargoZaman:'24 Haz · 14:05', teslim:false},
    {no:'03310', tarih:'2026-02-02', eposta:'mehmet@ornek.com', urunler:[{id:'airoptix', adet:2, sag:'-1.75', sol:'-2.00'}],                                tutar:2199.80, odeme:'Kredi kartı · 2 taksit', durum:'kargolandi', kargoZaman:'3 Şub · 12:00',  teslim:true},
    /* Zeynep — 1 sipariş */
    {no:'05201', tarih:'2026-06-30', eposta:'zeynep@ornek.com', urunler:[{id:'dailies', adet:6, sag:'-3.00', sol:'-2.75'}],                                 tutar:5531.40, odeme:'Kredi kartı · 6 taksit', durum:'hazirlaniyor'}
  ]);

  doYaz(DO_KEY.epostalar, [
    {zaman:'2026-07-04T09:15:00', etiket:'4 Tem · 09:15', kime:'selin@ornek.com',  konu:'Sipariş onayı #05204 — Oasys 1-Day ×6', tip:'siparis'},
    {zaman:'2026-06-28T18:40:00', etiket:'28 Haz · 18:40', kime:'zeynep@ornek.com', konu:'Doğan Optik\'e hoş geldin — e-postanı doğrula', tip:'kayit'},
    {zaman:'2026-06-24T14:05:00', etiket:'24 Haz · 14:05', kime:'mehmet@ornek.com', konu:'Siparişin kargoya verildi #05188', tip:'kargolandi'},
    {zaman:'2026-06-19T11:02:00', etiket:'19 Haz · 11:02', kime:'emre@ornek.com',   konu:'Doğan Optik\'e hoş geldin — e-postanı doğrula', tip:'kayit'}
  ]);

  doYaz(DO_KEY.tohum, true);
}
