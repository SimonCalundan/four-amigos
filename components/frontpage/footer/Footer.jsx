export default function Footer() {
  return (
    <div className="flex flex-col gap-8 text-center justify-around mt-12">
      <div>
        <p className="font-bold">Åbningstider</p>
        <p>Tirsdag - Søndag</p>
        <p>16:00 - 20:30</p>
        <p>Mandag lukket</p>
      </div>
      <div className="flex flex-col">
        <p className="font-bold">Kontakt</p>
        {/* Komponenter til some */}
        <a href="https://www.instagram.com/fouramigos_aarhus/">
          @fouramigos_aarhus
        </a>
        <a href="https://www.tiktok.com/@four.amigos03">@four.amigos03</a>
        <a href="mailto:fouramigosaps@gmail.com">fouramigosaps@gmail.com</a>
        <a href="https://www.facebook.com/profile.php?id=61551904498625">
          Four Amigos
        </a>
      </div>
      <div className="flex items-center flex-col">
        {/* Pin icon */}
        <p className="font-bold">Adresse</p>
        <p>Mejlgade 46B 8000 Aarhus C</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2221.8583756801813!2d10.210260977255183!3d56.15955326058835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c3fa703ab61af%3A0xde8c7b068bd1b2fe!2sFour%20Amigos!5e0!3m2!1sda!2sdk!4v1701769543892!5m2!1sda!2sdk"
          width="300"
          height="200"
          style={{
            border: 0,
          }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
