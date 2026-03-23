import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/caf2394d-110f-40c6-a52c-8e6cb8e9cddd/files/dccc980f-892f-4f4b-826b-e1f9bdf18183.jpg";
const TEAM_IMG = "https://cdn.poehali.dev/projects/caf2394d-110f-40c6-a52c-8e6cb8e9cddd/files/e31552bc-d004-4a2a-a90f-57f75be3ebef.jpg";

const NAV_ITEMS = [
  { label: "Услуги", href: "#services" },
  { label: "Флот", href: "#fleet" },
  { label: "Команда", href: "#team" },
  { label: "О нас", href: "#about" },
  { label: "Контакты", href: "#contacts" },
  { label: "Инвесторам", href: "#investors" },
  { label: "Клуб", href: "#club" },
];

const SERVICES = [
  { icon: "Plane", title: "Трансфер из аэропорта", desc: "Встретим с именным табличкой, поможем с багажом и лыжами. Комфортная доставка до отеля в Сочи или Красной Поляне.", price: "от 3 500 ₽", tag: "Круглосуточно" },
  { icon: "Map", title: "Индивидуальные экскурсии", desc: "Авторские маршруты по Сочи, Абхазии и Кавказу. Гид-водитель с глубокими знаниями региона.", price: "от 8 000 ₽", tag: "Весь год" },
  { icon: "UtensilsCrossed", title: "Гастротуры", desc: "Лучшие рестораны, рынки и фермы региона. Дегустации местной кухни и вина в аутентичных местах.", price: "от 10 000 ₽", tag: "Весь год" },
  { icon: "Mountain", title: "Горнолыжные тренировки", desc: "Трансфер на курорты Красной Поляны, помощь с экипировкой, сопровождение инструктора на трассах.", price: "от 7 000 ₽", tag: "Дек — Апр" },
  { icon: "Footprints", title: "Походы по Кавказу", desc: "Пешие маршруты разной сложности в горах. Опытные гиды, безопасные тропы, незабываемые виды.", price: "от 9 000 ₽", tag: "Только летом" },
  { icon: "Car", title: "Индивидуальный водитель", desc: "Mercedes V-Class на любое время — деловые поездки, шопинг, мероприятия. Ваш личный шофёр в Сочи.", price: "от 5 000 ₽/час", tag: "Весь год" },
];

const STATS = [
  { value: "500+", label: "Довольных гостей" },
  { value: "5", label: "Mercedes V-Class" },
  { value: "3", label: "Года на рынке" },
  { value: "24/7", label: "Поддержка" },
];

const TEAM_MEMBERS = [
  { name: "Александр Петров", role: "Старший водитель-гид", exp: "8 лет опыта", langs: "Русский, Английский" },
  { name: "Михаил Соколов", role: "Горный инструктор", exp: "12 лет опыта", langs: "Русский, Немецкий" },
  { name: "Дмитрий Волков", role: "Водитель-гастроном", exp: "6 лет опыта", langs: "Русский, Французский" },
  { name: "Сергей Орлов", role: "Водитель-трансферщик", exp: "5 лет опыта", langs: "Русский, Английский" },
];

const MONTHS = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const MONTHS_SHORT = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}>
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear] = useState(new Date().getFullYear());
  const [people, setPeople] = useState(2);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => { setTimeout(() => setHeroVisible(true), 100); }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const getDaysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (m: number, y: number) => {
    const d = new Date(y, m, 1).getDay();
    return d === 0 ? 7 : d;
  };

  const handleBooking = () => {
    if (!selectedService || !selectedDate) return;
    setBookingSuccess(true);
    setTimeout(() => { setBookingSuccess(false); setBookingStep(1); setSelectedService(""); setSelectedDate(""); }, 4000);
  };

  return (
    <div className="min-h-screen bg-obsidian text-[#EDE8DC] overflow-x-hidden">

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4" style={{ background: "linear-gradient(180deg,rgba(10,10,11,.95) 0%,transparent 100%)", backdropFilter: "blur(10px)" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
              <span className="text-xs font-bold text-obsidian font-sans">VG</span>
            </div>
            <span className="font-display text-xl font-semibold tracking-widest text-gold">ВАН ГАРД</span>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <button key={item.href} onClick={() => scrollTo(item.href)} className="nav-link font-sans">{item.label}</button>
            ))}
            <button onClick={() => scrollTo("#booking")} className="ml-4 px-5 py-2 text-xs font-bold tracking-widest uppercase font-sans text-obsidian gold-gradient rounded-full transition-all hover:shadow-lg hover:shadow-yellow-400/30">
              Забронировать
            </button>
          </div>
          <button className="lg:hidden text-gold" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden mt-4 px-4 py-6 glass-card rounded-2xl">
            {NAV_ITEMS.map(item => (
              <button key={item.href} onClick={() => scrollTo(item.href)} className="block w-full text-left py-3 nav-link font-sans border-b border-white/5">{item.label}</button>
            ))}
            <button onClick={() => scrollTo("#booking")} className="mt-4 w-full py-3 text-xs font-bold tracking-widest uppercase font-sans text-obsidian gold-gradient rounded-full">
              Забронировать
            </button>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Mercedes V-Class Сочи" className="w-full h-full object-cover" style={{ filter: "brightness(0.32)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(10,10,11,.3) 0%,rgba(10,10,11,.05) 40%,rgba(10,10,11,.92) 100%)" }} />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-6 font-sans">Сочи · Красная Поляна · Кавказ</p>
            <h1 className="font-display text-7xl md:text-9xl font-light mb-4 leading-none" style={{ letterSpacing: "-.02em" }}>
              <span className="block text-gradient-gold">Ван Гард</span>
            </h1>
            <p className="font-display text-2xl md:text-3xl text-white/80 mb-4 font-light italic">
              Ваш лучший попутчик и компаньон
            </p>
            <p className="font-sans text-sm md:text-base text-white/45 mb-16 max-w-xl mx-auto leading-relaxed">
              Встречаем, везём, сопровождаем. Mercedes V-Class 4MATIC — с первого шага в аэропорту до последнего воспоминания.
            </p>
          </div>
          <div className={`transition-all duration-1000 delay-500 ${heroVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
            <button onClick={() => scrollTo("#booking")} className="start-btn mx-auto">
              START
            </button>
            <p className="mt-6 text-xs text-white/25 tracking-widest uppercase font-sans">Нажмите для бронирования</p>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent mx-auto" />
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="section-divider mb-16" />
          <AnimSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-5xl md:text-6xl text-gradient-gold font-bold">{s.value}</div>
                  <div className="font-sans text-xs text-white/40 mt-2 tracking-widest uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </AnimSection>
          <div className="section-divider mt-16" />
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimSection>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 font-sans">Что мы делаем</p>
              <h2 className="font-display text-5xl md:text-6xl font-light">Наши услуги</h2>
            </div>
          </AnimSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <AnimSection key={i}>
                <div className="glass-card glass-card-hover rounded-2xl p-8 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                      <Icon name={s.icon} size={22} className="text-obsidian" />
                    </div>
                    <span className="text-xs text-gold/70 font-sans bg-gold/10 px-3 py-1 rounded-full">{s.tag}</span>
                  </div>
                  <h3 className="font-display text-2xl mb-3 font-medium">{s.title}</h3>
                  <p className="font-sans text-sm text-white/45 leading-relaxed flex-1">{s.desc}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-gold font-sans font-semibold">{s.price}</span>
                    <button onClick={() => { setSelectedService(s.title); scrollTo("#booking"); }}
                      className="text-xs font-sans text-white/35 hover:text-gold transition-colors flex items-center gap-1">
                      Забронировать <Icon name="ArrowRight" size={14} />
                    </button>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOOKING ─── */}
      <section id="booking" className="py-24 px-6" style={{ background: "linear-gradient(180deg,#0A0A0B 0%,#111114 50%,#0A0A0B 100%)" }}>
        <div className="max-w-3xl mx-auto">
          <AnimSection>
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 font-sans">Онлайн-бронирование</p>
              <h2 className="font-display text-5xl md:text-6xl font-light">Забронировать</h2>
            </div>
          </AnimSection>

          {bookingSuccess ? (
            <AnimSection>
              <div className="glass-card rounded-3xl p-12 text-center">
                <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Check" size={36} className="text-obsidian" />
                </div>
                <h3 className="font-display text-3xl mb-3">Заявка отправлена!</h3>
                <p className="font-sans text-white/45">Мы свяжемся с вами в течение 15 минут для подтверждения</p>
              </div>
            </AnimSection>
          ) : (
            <AnimSection>
              <div className="glass-card rounded-3xl p-8 md:p-12">
                <div className="flex items-center justify-center gap-4 mb-10">
                  {[1, 2, 3].map(step => (
                    <div key={step} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-sans transition-all ${bookingStep >= step ? "gold-gradient text-obsidian" : "bg-white/10 text-white/25"}`}>
                        {step}
                      </div>
                      {step < 3 && <div className={`w-12 h-px transition-all ${bookingStep > step ? "bg-gold" : "bg-white/10"}`} />}
                    </div>
                  ))}
                </div>

                {bookingStep === 1 && (
                  <div>
                    <h3 className="font-display text-2xl mb-6 text-center">Выберите услугу</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                      {SERVICES.map(s => (
                        <button key={s.title} onClick={() => setSelectedService(s.title)}
                          className={`p-4 rounded-xl text-left transition-all font-sans text-sm border ${selectedService === s.title ? "border-gold/60 bg-gold/10 text-gold" : "border-white/10 bg-white/2 text-white/55 hover:border-white/20"}`}>
                          <div className="flex items-center gap-3">
                            <Icon name={s.icon} size={16} />
                            <div>
                              <div className="font-medium">{s.title}</div>
                              <div className="text-xs opacity-60 mt-0.5">{s.price}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <button onClick={() => selectedService && setBookingStep(2)}
                      className={`w-full py-4 rounded-2xl font-sans font-semibold tracking-widest uppercase text-sm transition-all ${selectedService ? "gold-gradient text-obsidian hover:shadow-lg hover:shadow-yellow-400/20" : "bg-white/5 text-white/20 cursor-not-allowed"}`}>
                      Далее →
                    </button>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div>
                    <h3 className="font-display text-2xl mb-6 text-center">Выберите дату</h3>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <button onClick={() => setSelectedMonth(m => Math.max(0, m - 1))} className="p-2 hover:text-gold transition-colors">
                          <Icon name="ChevronLeft" size={20} />
                        </button>
                        <span className="font-display text-xl">{MONTHS[selectedMonth]} {selectedYear}</span>
                        <button onClick={() => setSelectedMonth(m => Math.min(11, m + 1))} className="p-2 hover:text-gold transition-colors">
                          <Icon name="ChevronRight" size={20} />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].map(d => (
                          <div key={d} className="text-center text-xs text-white/25 font-sans py-1">{d}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: getFirstDay(selectedMonth, selectedYear) - 1 }).map((_, i) => <div key={`e-${i}`} />)}
                        {Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }).map((_, i) => {
                          const day = i + 1;
                          const dateStr = `${day} ${MONTHS_SHORT[selectedMonth]} ${selectedYear}`;
                          const isPast = new Date(selectedYear, selectedMonth, day) < new Date(new Date().setHours(0,0,0,0));
                          return (
                            <button key={day} disabled={isPast} onClick={() => setSelectedDate(dateStr)}
                              className={`aspect-square rounded-lg text-sm font-sans transition-all ${selectedDate === dateStr ? "gold-gradient text-obsidian font-bold" : isPast ? "text-white/12 cursor-not-allowed" : "hover:bg-white/10 text-white/65"}`}>
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-xs text-white/35 uppercase tracking-widest mb-3 font-sans">Количество гостей</label>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setPeople(p => Math.max(1, p - 1))} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                          <Icon name="Minus" size={16} />
                        </button>
                        <span className="font-display text-3xl w-12 text-center">{people}</span>
                        <button onClick={() => setPeople(p => Math.min(7, p + 1))} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                          <Icon name="Plus" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setBookingStep(1)} className="flex-1 py-4 rounded-2xl font-sans border border-white/15 text-white/45 hover:border-white/30 transition-all text-sm">← Назад</button>
                      <button onClick={() => selectedDate && setBookingStep(3)}
                        className={`flex-1 py-4 rounded-2xl font-sans font-semibold tracking-widest uppercase text-sm transition-all ${selectedDate ? "gold-gradient text-obsidian" : "bg-white/5 text-white/20 cursor-not-allowed"}`}>
                        Далее →
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div>
                    <h3 className="font-display text-2xl mb-6 text-center">Ваши контакты</h3>
                    <div className="glass-card rounded-xl p-4 mb-6">
                      <div className="text-xs text-white/35 font-sans uppercase tracking-widest mb-3">Итог заявки</div>
                      <div className="flex justify-between text-sm font-sans mb-2"><span className="text-white/45">Услуга</span><span className="text-gold">{selectedService}</span></div>
                      <div className="flex justify-between text-sm font-sans mb-2"><span className="text-white/45">Дата</span><span>{selectedDate}</span></div>
                      <div className="flex justify-between text-sm font-sans"><span className="text-white/45">Гостей</span><span>{people}</span></div>
                    </div>
                    <div className="space-y-4 mb-6">
                      <input placeholder="Ваше имя" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 font-sans text-sm placeholder-white/22 focus:outline-none focus:border-gold/60 transition-all text-white" />
                      <input placeholder="+7 (___) ___-__-__" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 font-sans text-sm placeholder-white/22 focus:outline-none focus:border-gold/60 transition-all text-white" />
                      <input placeholder="E-mail (необязательно)" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 font-sans text-sm placeholder-white/22 focus:outline-none focus:border-gold/60 transition-all text-white" />
                      <textarea placeholder="Особые пожелания (багаж, дети, питомец...)" rows={3}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 font-sans text-sm placeholder-white/22 focus:outline-none focus:border-gold/60 transition-all resize-none text-white" />
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setBookingStep(2)} className="flex-1 py-4 rounded-2xl font-sans border border-white/15 text-white/45 hover:border-white/30 transition-all text-sm">← Назад</button>
                      <button onClick={handleBooking} className="flex-1 py-4 rounded-2xl font-sans font-bold tracking-widest uppercase text-sm gold-gradient text-obsidian hover:shadow-lg hover:shadow-yellow-400/20 transition-all">
                        Отправить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </AnimSection>
          )}
        </div>
      </section>

      {/* ─── FLEET ─── */}
      <section id="fleet" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimSection>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 font-sans">Автомобили</p>
              <h2 className="font-display text-5xl md:text-6xl font-light">Наш флот</h2>
            </div>
          </AnimSection>
          <AnimSection>
            <div className="glass-card rounded-3xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="relative min-h-[420px]">
                  <img src={HERO_IMG} alt="Mercedes V-Class" className="w-full h-full object-cover absolute inset-0" style={{ filter: "brightness(0.6)" }} />
                  <div className="absolute inset-0 flex items-end p-8">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-4 py-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs font-sans text-gold">5 автомобилей в парке</span>
                      </div>
                      <h3 className="font-display text-4xl font-light text-white">Mercedes<br/>V-Class 4MATIC</h3>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <p className="font-sans text-white/50 leading-relaxed mb-8">
                    Флагманский минивэн бизнес-класса. 7 мест с огромным пространством для ног, полным приводом 4MATIC для горных дорог и панорамной крышей для обзора кавказских пейзажей.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: "Users", label: "До 7 пассажиров" },
                      { icon: "Luggage", label: "Багаж и лыжи" },
                      { icon: "Wifi", label: "Wi-Fi на борту" },
                      { icon: "Snowflake", label: "Климат-контроль" },
                      { icon: "Dog", label: "Питомцы OK" },
                      { icon: "Baby", label: "Детские кресла" },
                      { icon: "Shield", label: "Полная страховка" },
                      { icon: "Star", label: "Класс Бизнес" },
                    ].map((f, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
                        <Icon name={f.icon} size={15} className="text-gold flex-shrink-0" />
                        <span className="font-sans text-xs text-white/55">{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section id="team" className="py-24 px-6" style={{ background: "linear-gradient(180deg,#0A0A0B 0%,#111114 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <AnimSection>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 font-sans">Профессионалы</p>
              <h2 className="font-display text-5xl md:text-6xl font-light">Наша команда</h2>
              <p className="font-sans text-white/35 mt-4 max-w-xl mx-auto text-sm">Опытные водители-гиды, которые знают Сочи и Кавказ как свои пять пальцев</p>
            </div>
          </AnimSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {TEAM_MEMBERS.map((m, i) => (
              <AnimSection key={i}>
                <div className="glass-card glass-card-hover rounded-2xl p-6 text-center">
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-gold/25">
                    <img src={TEAM_IMG} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-display text-xl mb-1">{m.name}</h3>
                  <p className="font-sans text-xs text-gold mb-2">{m.role}</p>
                  <p className="font-sans text-xs text-white/35">{m.exp}</p>
                  <p className="font-sans text-xs text-white/25 mt-1">{m.langs}</p>
                </div>
              </AnimSection>
            ))}
          </div>
          <AnimSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "Award", title: "Лицензированные гиды", desc: "Все водители-гиды прошли официальную сертификацию и аккредитацию" },
                { icon: "Heart", title: "Вежливость и забота", desc: "Индивидуальный подход к каждому гостю, внимание к деталям и особым пожеланиям" },
                { icon: "Shield", title: "Безопасность прежде всего", desc: "Опыт вождения в горах, знание трасс и пешеходных маршрутов" },
              ].map((f, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 flex gap-4">
                  <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                    <Icon name={f.icon} size={18} className="text-obsidian" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg mb-2">{f.title}</h3>
                    <p className="font-sans text-xs text-white/35 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <p className="text-xs tracking-[0.4em] uppercase text-gold mb-6 font-sans">О компании</p>
              <h2 className="font-display text-5xl md:text-6xl font-light mb-8 leading-none">
                Миссия —<br/>
                <span className="text-gradient-gold">встречать</span><br/>
                гостей Сочи
              </h2>
              <p className="font-sans text-white/45 leading-relaxed mb-6">
                Ван Гард — это больше, чем трансфер. Мы создаём полноценный опыт путешествия в одном из красивейших регионов России. От встречи в аэропорту до проводов — каждый момент на высшем уровне.
              </p>
              <p className="font-sans text-white/45 leading-relaxed mb-8">
                Мы позаботимся о вашем багаже и лыжах, детях и питомцах. Наши водители знают лучшие рестораны, скрытые горные тропы и незаметные смотровые площадки.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Аэропорт 24/7","Горные маршруты","Детские кресла","Лыжи и багаж","Питомцы"].map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full border border-gold/20 text-xs font-sans text-gold/60 bg-gold/5">{tag}</span>
                ))}
              </div>
            </AnimSection>
            <AnimSection>
              <div className="relative">
                <div className="glass-card rounded-3xl overflow-hidden">
                  <img src={TEAM_IMG} alt="Команда Ван Гард" className="w-full h-[500px] object-cover" style={{ filter: "brightness(0.55)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="glass-card rounded-2xl p-6">
                      <p className="font-display text-xl italic text-white/90 mb-3">
                        "Всё начинается с нажатия кнопки START"
                      </p>
                      <p className="font-sans text-xs text-gold">— Ван Гард, Сочи</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ─── INVESTORS ─── */}
      <section id="investors" className="py-24 px-6" style={{ background: "linear-gradient(135deg,#0A0A0B 0%,#111114 50%,#0D0D10 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <AnimSection>
            <div className="glass-card rounded-3xl p-12 text-center" style={{ borderColor: "rgba(201,168,76,0.25)" }}>
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-6 py-2 mb-8">
                <Icon name="TrendingUp" size={16} className="text-gold" />
                <span className="text-xs font-sans text-gold tracking-widest uppercase">Для инвесторов</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-light mb-6">
                Инвестируйте<br/>в премиум-туризм Сочи
              </h2>
              <p className="font-sans text-white/45 max-w-2xl mx-auto mb-10 leading-relaxed">
                Сочи — один из самых быстрорастущих туристических направлений России. Рынок премиум-трансферов и экскурсий показывает устойчивый рост год к году. Ван Гард приглашает стратегических партнёров для масштабирования.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                  { icon: "BarChart3", title: "Растущий рынок", desc: "Туристический поток в Сочи увеличивается ежегодно" },
                  { icon: "Users", title: "Лояльная база", desc: "Высокий процент повторных клиентов и рекомендаций" },
                  { icon: "Zap", title: "Масштабируемость", desc: "Готовая модель для тиражирования в других курортах" },
                ].map((f, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-gold/10 bg-gold/3">
                    <Icon name={f.icon} size={24} className="text-gold mb-3" />
                    <h3 className="font-display text-lg mb-2">{f.title}</h3>
                    <p className="font-sans text-xs text-white/35">{f.desc}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo("#contacts")} className="px-10 py-4 gold-gradient text-obsidian font-sans font-bold tracking-widest uppercase text-sm rounded-2xl hover:shadow-xl hover:shadow-yellow-400/20 transition-all">
                Связаться с командой
              </button>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ─── CLUB ─── */}
      <section id="club" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimSection>
            <div className="relative rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg,rgba(201,168,76,.08) 0%,rgba(0,212,255,.03) 100%)", border: "1px solid rgba(201,168,76,0.18)" }}>
              <div className="relative z-10 p-12 text-center">
                <div className="inline-flex items-center gap-2 bg-[#00D4FF]/10 border border-[#00D4FF]/20 rounded-full px-6 py-2 mb-8">
                  <Icon name="Crown" size={16} className="text-[#00D4FF]" />
                  <span className="text-xs font-sans text-[#00D4FF] tracking-widest uppercase">Клуб Van Guard</span>
                </div>
                <h2 className="font-display text-5xl md:text-6xl font-light mb-6">
                  Привилегии<br/>для избранных
                </h2>
                <p className="font-sans text-white/45 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Закрытый клуб для постоянных гостей и партнёров. Приоритетное бронирование, персональный менеджер, эксклюзивные маршруты и специальные условия.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {[
                    { icon: "Clock", text: "Приоритет 24/7" },
                    { icon: "User", text: "Личный менеджер" },
                    { icon: "Percent", text: "Скидки до 25%" },
                    { icon: "Gift", text: "Бонусы и подарки" },
                  ].map((f, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/3 border border-white/8">
                      <Icon name={f.icon} size={20} className="text-gold mx-auto mb-2" />
                      <span className="font-sans text-xs text-white/45 block">{f.text}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => scrollTo("#booking")} className="px-10 py-4 gold-gradient text-obsidian font-sans font-bold tracking-widest uppercase text-sm rounded-2xl hover:shadow-xl hover:shadow-yellow-400/20 transition-all">
                    Вступить в клуб
                  </button>
                  <button onClick={() => scrollTo("#contacts")} className="px-10 py-4 border border-white/18 text-white/50 font-sans font-medium text-sm rounded-2xl hover:border-gold/40 hover:text-gold transition-all">
                    Узнать подробнее
                  </button>
                </div>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ─── CONTACTS ─── */}
      <section id="contacts" className="py-24 px-6" style={{ background: "#111114" }}>
        <div className="max-w-5xl mx-auto">
          <AnimSection>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 font-sans">Свяжитесь с нами</p>
              <h2 className="font-display text-5xl md:text-6xl font-light">Контакты</h2>
            </div>
          </AnimSection>
          <div className="grid md:grid-cols-2 gap-12">
            <AnimSection>
              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (862) 000-00-00", sub: "Круглосуточно" },
                  { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "@vanguard_sochi", sub: "Ответ в течение 5 минут" },
                  { icon: "Mail", label: "Email", value: "hello@vanguard-sochi.ru", sub: "Для деловых вопросов" },
                  { icon: "MapPin", label: "Город", value: "Сочи, Россия", sub: "Встречаем в аэропорту Адлер" },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 glass-card rounded-xl">
                    <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={16} className="text-obsidian" />
                    </div>
                    <div>
                      <p className="font-sans text-xs text-white/28 uppercase tracking-widest mb-1">{c.label}</p>
                      <p className="font-sans font-medium text-white">{c.value}</p>
                      <p className="font-sans text-xs text-gold/55 mt-0.5">{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimSection>
            <AnimSection>
              <div className="glass-card rounded-2xl p-8">
                <h3 className="font-display text-2xl mb-6">Написать нам</h3>
                <div className="space-y-4">
                  <input placeholder="Ваше имя" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 font-sans text-sm placeholder-white/22 focus:outline-none focus:border-gold/60 transition-all text-white" />
                  <input placeholder="Телефон или email" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 font-sans text-sm placeholder-white/22 focus:outline-none focus:border-gold/60 transition-all text-white" />
                  <textarea placeholder="Расскажите о вашем путешествии..." rows={4}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 font-sans text-sm placeholder-white/22 focus:outline-none focus:border-gold/60 transition-all resize-none text-white" />
                  <button className="w-full py-4 gold-gradient text-obsidian font-sans font-bold tracking-widest uppercase text-sm rounded-xl hover:shadow-lg hover:shadow-yellow-400/20 transition-all">
                    Отправить сообщение
                  </button>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
              <span className="text-xs font-bold text-obsidian font-sans">VG</span>
            </div>
            <div>
              <div className="font-display text-lg tracking-widest text-gold">ВАН ГАРД</div>
              <div className="font-sans text-xs text-white/20">Ваш лучший попутчик в Сочи</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {NAV_ITEMS.map(item => (
              <button key={item.href} onClick={() => scrollTo(item.href)} className="nav-link font-sans text-xs">{item.label}</button>
            ))}
          </div>
          <div className="font-sans text-xs text-white/18">© 2024 Van Guard · Сочи</div>
        </div>
      </footer>
    </div>
  );
}
