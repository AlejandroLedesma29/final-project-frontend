import React, { useState } from 'react';
import './terms.scss';
import MenuComponent from '../menu/menu';

function TermsAndConditionsPage() {
  const initialSections  = [
    { id: 1, title: 'Política de Privacidad', content: `  
    <p>Última actualización: 01 de noviembre de 2023</p>
    <p>Esta Política de Privacidad describe nuestras políticas y procedimientos sobre la recopilación, uso y divulgación de su información cuando utiliza el Servicio y le informa acerca de sus derechos de privacidad y cómo la ley lo protege.</p>
    <p>Utilizamos sus datos personales para proporcionar y mejorar el Servicio. Al utilizar el Servicio, usted acepta la recopilación y el uso de información de acuerdo con esta Política de Privacidad.</p>
    <p>De conformidad con lo dispuesto en la Ley 1581 de 2012 y el Decreto 1377 de 2013, declaro que entregué de forma libre y voluntaria mis Datos Personales y, con mi aceptación y/o firma, autorizo a Full House Shoes para que, como Responsable, realice la recolección y tratamiento de mis datos personales para las finalidades indicadas más adelante y de conformidad con la Política de tratamiento de la información de Full House Shoes, la cual está disponible en la página web www.fullhouseshoes.com/terms/</p>
    `,active: true },
    { id: 2, title: 'Definiciones', content: `<h3>Definiciones</h3>
    <p>Para los fines de esta Política de Privacidad:</p>
    <ul>
    <li>
    <p><strong>Cuenta</strong> significa una cuenta única creada para que usted acceda a nuestro Tienda o a partes de la misma.</p>
    </li>
    <li>
    <p><strong>Afiliado</strong> significa una entidad que controla, es controlada por o está bajo el control común de una parte, donde "control" significa propiedad del 50% o más de las acciones, el interés patrimonial u otros valores con derecho a voto para la elección de directores u otra autoridad de gestión.</p>
    </li>
    <li>
    <p><strong>Empresa</strong> (referida como "la Empresa", "Nosotros", "Nuestro" o "Nuestra" en este Acuerdo) se refiere a Full House Shoes.</p>
    </li>
    <li>
    <p><strong>Cookies</strong> son pequeños archivos que se colocan en su computadora, dispositivo móvil u otro dispositivo por un sitio web, que contienen los detalles de su historial de navegación en ese sitio web, entre sus muchos usos.</p>
    </li>
    <li>
    <p><strong>País</strong> se refiere a: Colombia</p>
    </li>
    <li>
    <p><strong>Dispositivo</strong> significa cualquier dispositivo que puede acceder al Servicio, como una computadora, un teléfono celular o una tableta digital.</p>
    </li>
    <li>
    <p><strong>Datos Personales</strong> son cualquier información que se relaciona con una persona identificada o identificable.</p>
    </li>
    <li>
    <p><strong>Servicio</strong> se refiere al Sitio web.</p>
    </li>
    <li>
    <p><strong>Proveedor de Servicios</strong> significa cualquier persona natural o jurídica que procesa los datos en nombre de la Compañía. Se refiere a empresas de terceros o individuos empleados por la Compañía para facilitar el Servicio, proporcionar el Servicio en nombre de la Compañía, realizar servicios relacionados con el Servicio o ayudar a la Compañía en el análisis de cómo se utiliza el Servicio.</p>
    </li>
    <li>
    <p><strong>Datos de Uso</strong> se refiere a datos recopilados automáticamente, ya sea generados por el uso del Servicio o a través de la infraestructura del Servicio en sí (por ejemplo, la duración de una visita a una página).</p>
    </li>
    <li>
    <p><strong>Sitio web</strong> se refiere a Full House Shoes, accesible desde <a href="http://www.fullhouseshoes.com" rel="external nofollow noopener" target="_blank">http://www.fullhouse.com</a></p>
    </li>
    <li>
    <p><strong>Tú</strong> significa el individuo que accede o utiliza el Servicio, o la empresa u otra entidad legal en nombre de la cual dicho individuo accede o utiliza el Servicio, según corresponda.</p>
    </li>
    </ul>` ,active: false },
    { id: 3, title: 'Recopilación y Uso de Tus Datos Personales', content: `<h3>Tipos de Datos Recopilados</h3>
    <h4>Datos Personales</h4>
    <p>Mientras utilizas Nuestro Servicio, podemos solicitarte que nos proporciones cierta información personal identificable que se puede utilizar para contactarte o identificarte. La información personal identificable puede incluir, pero no se limita a:</p>
    <ul>
    <li>
    <p>Dirección de correo electrónico</p>
    </li>
    <li>
    <p>Nombre y apellidos</p>
    </li>
    <li>
    <p>Número de teléfono</p>
    </li>
    <li>
    <p>Dirección, Estado, Provincia, Código postal, Ciudad</p>
    </li>
    <li>
    <p>Datos de uso</p>
    </li>
    </ul>
    <h4>Datos de Uso</h4>
    <p>Los Datos de Uso se recopilan automáticamente al utilizar el Servicio.</p>
    <p>Los Datos de Uso pueden incluir información como la dirección de Protocolo de Internet de Tu dispositivo (por ejemplo, dirección IP), tipo de navegador, versión del navegador, las páginas de nuestro Servicio que visitas, la fecha y hora de Tu visita, el tiempo que pasas en esas páginas, identificadores de dispositivo únicos y otros datos de diagnóstico.</p>
    <p>Cuando accedes al Servicio a través de un dispositivo móvil, podemos recopilar cierta información automáticamente, incluyendo, pero sin limitarse a, el tipo de dispositivo móvil que utilizas, la identificación única de Tu dispositivo móvil, la dirección IP de Tu dispositivo móvil, el sistema operativo móvil que utilizas, el tipo de navegador de Internet móvil que utilizas, identificadores únicos de dispositivos y otros datos de diagnóstico.</p>
    <p>También podemos recopilar información que Tu navegador envía cada vez que visitas nuestro Servicio o cuando accedes al Servicio a través de un dispositivo móvil.</p>
    <h4>Tecnologías de Seguimiento y Cookies</h4>
    <p>Utilizamos Cookies y tecnologías de seguimiento similares para seguir la actividad en Nuestro Servicio y almacenar cierta información. Las tecnologías de seguimiento utilizadas son balizas, etiquetas y scripts para recopilar y seguir información y para mejorar y analizar Nuestro Servicio. Las tecnologías que utilizamos pueden incluir:</p>
    <ul>
    <li><strong>Cookies o Cookies del Navegador.</strong> Una cookie es un pequeño archivo colocado en Tu dispositivo. Puedes instruir a Tu navegador para que rechace todas las Cookies o para que te avise cuando se envía una Cookie. Sin embargo, si no aceptas las Cookies, es posible que no puedas utilizar algunas partes de nuestro Servicio. A menos que hayas ajustado la configuración de Tu navegador para que rechace las Cookies, nuestro Servicio utilizará Cookies.</li>
    <li><strong>Balizas web.</strong> Ciertas secciones de nuestro Servicio y nuestros correos electrónicos pueden contener pequeños archivos electrónicos conocidos como balizas web (también conocidos como gifs transparentes, etiquetas de píxeles y gifs de un solo píxel) que permiten a la Compañía, por ejemplo, contar los usuarios que han visitado esas páginas o abierto un correo electrónico y para otras estadísticas relacionadas con el sitio web (por ejemplo, registrar la popularidad de una sección en particular y verificar la integridad del sistema y del servidor).</li>
    </ul>
    <p>Las Cookies pueden ser "Persistentes" o "de Sesión". Las Cookies Persistentes permanecen en Tu ordenador personal o dispositivo móvil cuando te desconectas, mientras que las Cookies de Sesión se eliminan tan pronto como cierras Tu navegador web. Obtén más información sobre las cookies en el artículo del sitio web de <a href="https://www.privacypolicies.com/blog/privacy-policy-template/#Use_Of_Cookies_Log_Files_And_Tracking" target="_blank">Políticas de Privacidad</a>.</p>
    <p>Utilizamos tanto Cookies de Sesión como Cookies Persistentes para los fines establecidos a continuación:</p>
    <ul>
    <li>
    <p><strong>Cookies Necesarias / Esenciales</strong></p>
    <p>Tipo: Cookies de Sesión</p>
    <p>Administrado por: Nosotros</p>
    <p>Propósito: Estas Cookies son esenciales para proporcionarte servicios disponibles a través del Sitio web y permitirte utilizar algunas de sus funciones. Ayudan a autenticar a los usuarios y prevenir el uso fraudulento de las cuentas de usuario. Sin estas Cookies, no se pueden proporcionar los servicios que has solicitado, y solo utilizamos estas Cookies para proporcionarte esos servicios.</p>
    </li>
    <li>
    <p><strong>Cookies de Aceptación de Políticas de Cookies / Aviso</strong></p>
    <p>Tipo: Cookies Persistentes</p>
    <p>Administrado por: Nosotros</p>
    <p>Propósito: Estas Cookies identifican si los usuarios han aceptado el uso de cookies en el Sitio web.</p>
    </li>
    <li>
    <p><strong>Cookies de Funcionalidad</strong></p>
    <p>Tipo: Cookies Persistentes</p>
    <p>Administrado por: Nosotros</p>
    <p>Propósito: Estas Cookies nos permiten recordar las elecciones que haces cuando utilizas el Sitio web, como recordar tus datos de inicio de sesión o tus preferencias de idioma. El propósito de estas Cookies es proporcionarte una experiencia más personal y evitar que tengas que volver a ingresar tus preferencias cada vez que utilices el Sitio web.</p>
    </li>
    </ul>
    <p>Para obtener más información sobre las Cookies que utilizamos y tus opciones con respecto a las Cookies, visita nuestra Política de Cookies o la sección de Cookies de nuestra Política de Privacidad.</p>
    `,active: false  },
    { id: 4, title: 'Uso de Tus Datos Personales', content: `<p>La Compañía puede utilizar Datos Personales para los siguientes fines:</p>
    <ul>
    <li>
    <p><strong>Para proporcionar y mantener nuestro Servicio</strong>, incluyendo supervisar el uso de nuestro Servicio.</p>
    </li>
    <li>
    <p><strong>Para gestionar Tu Cuenta:</strong> para gestionar Tu registro como usuario del Servicio. Los Datos Personales que proporcionas te dan acceso a diferentes funcionalidades del Servicio que están disponibles para ti como usuario registrado.</p>
    </li>
    <li>
    <p><strong>Para el cumplimiento de un contrato:</strong> el desarrollo, el cumplimiento y la realización del contrato de compra de los productos, artículos o servicios que has adquirido o de cualquier otro contrato con Nosotros a través del Servicio.</p>
    </li>
    <li>
    <p><strong>Para contactarte:</strong> para contactarte por correo electrónico, llamadas telefónicas, SMS u otras formas equivalentes de comunicación electrónica, como notificaciones push de aplicaciones móviles, sobre actualizaciones o comunicaciones informativas relacionadas con las funcionalidades, productos o servicios, incluyendo actualizaciones de seguridad, cuando sea necesario o razonable para su implementación.</p>
    </li>
    <li>
    <p><strong>Para proporcionarte</strong> noticias, ofertas especiales e información general sobre otros bienes, servicios y eventos que ofrecemos y que sean similares a los que ya has adquirido o sobre los que has preguntado, a menos que hayas optado por no recibir dicha información.</p>
    </li>
    <li>
    <p><strong>Para gestionar Tus solicitudes:</strong> para atender y gestionar Tus solicitudes hacia Nosotros.</p>
    </li>
    <li>
    <p><strong>Para transferencias comerciales:</strong> Podemos utilizar tu información para evaluar o llevar a cabo una fusión, venta de activos, financiación, o adquisición de todo o parte de nuestro negocio por otra empresa, ya sea como empresa en funcionamiento o como parte de una quiebra, liquidación o procedimiento similar, en el que los Datos Personales en posesión de Nosotros sobre los usuarios de nuestro Servicio se encuentren entre los activos transferidos.</p>
    </li>
    <li>
    <p><strong>Para otros fines</strong>: podemos utilizar Tu información para otros fines, como análisis de datos, identificación de tendencias de uso, determinación de la efectividad de nuestras campañas promocionales y para evaluar y mejorar nuestro Servicio, productos, servicios, marketing y tu experiencia.</p>
    </li>
    </ul>
    <p>Podemos compartir Tu información personal en las siguientes situaciones:</p>
    <ul>
    <li><strong>Con Proveedores de Servicios:</strong> Podemos compartir Tu información personal con Proveedores de Servicios para supervisar y analizar el uso de nuestro Servicio, para contactarte.</li>
    <li><strong>Para transferencias comerciales:</strong> Podemos compartir o transferir Tu información personal en relación con, o durante las negociaciones de, cualquier fusión, venta de activos de la Compañía, financiamiento o adquisición de todo o parte de nuestro negocio por otra empresa.</li>
    <li><strong>Con Afiliados:</strong> Podemos compartir Tu información con Nuestros afiliados, en cuyo caso requeriremos que esos afiliados respeten esta Política de Privacidad. Los afiliados incluyen a Nuestra empresa matriz y cualquier otra filial, socios de empresas conjuntas u otras empresas que controlamos o que están bajo un control común con Nosotros.</li>
    <li><strong>Con socios comerciales:</strong> Podemos compartir Tu información con Nuestros socios comerciales para ofrecerte ciertos productos, servicios o promociones.</li>
    <li><strong>Con otros usuarios:</strong> cuando compartes información personal o interactúas de otra manera en las áreas públicas con otros usuarios, esa información puede ser vista por todos los usuarios y puede distribuirse públicamente fuera.</li>
    <li><strong>Con Tu consentimiento</strong>: Podemos revelar Tu información personal para cualquier otro propósito con Tu consentimiento.</li>
    </ul>`,active: false  },
    { id: 5, title: 'Conservación de Tus Datos Personales', content: `<p>La Compañía conservará Tus Datos Personales solo durante el tiempo necesario para los fines establecidos en esta Política de Privacidad. Conservaremos y utilizaremos Tus Datos Personales en la medida necesaria para cumplir con nuestras obligaciones legales (por ejemplo, si se nos exige conservar tus datos para cumplir con las leyes aplicables), resolver disputas y hacer cumplir nuestros acuerdos legales y políticas.</p>
    <p>La Compañía también conservará Datos de Uso con fines de análisis interno. Los Datos de Uso generalmente se conservan por un período de tiempo más corto, excepto cuando estos datos se utilizan para fortalecer la seguridad o mejorar la funcionalidad de Nuestro Servicio, o cuando estamos legalmente obligados a conservar estos datos por períodos de tiempo más largos.</p>
    <h3>Transferencia de Tus Datos Personales</h3>
    <p>Tu información, incluidos los Datos Personales, se procesa en las oficinas operativas de la Compañía y en cualquier otro lugar donde se encuentren las partes involucradas en el procesamiento. Esto significa que esta información puede ser transferida a — y mantenida en — computadoras ubicadas fuera de Tu estado, provincia, país u otra jurisdicción gubernamental donde las leyes de protección de datos pueden diferir de las de Tu jurisdicción.</p>
    <p>Tu consentimiento a esta Política de Privacidad seguido de Tu envío de tal información representa Tu acuerdo con esa transferencia.</p>
    <p>La Compañía tomará todas las medidas razonablemente necesarias para garantizar que Tus datos se traten de manera segura y de acuerdo con esta Política de Privacidad y que no se realice ninguna transferencia de Tus Datos Personales a una organización o país a menos que haya controles adecuados en su lugar, incluida la seguridad de Tus datos y otra información personal.</p>
    <h3>Eliminar Tus Datos Personales</h3>
    <p>Tienes el derecho de eliminar o solicitar que Te ayudemos a eliminar los Datos Personales que hemos recopilado sobre Ti.</p>
    <p>Nuestro Servicio puede brindarte la capacidad de eliminar cierta información sobre Ti desde dentro del Servicio.</p>
    <p>Puedes actualizar, modificar o eliminar Tu información en cualquier momento iniciando sesión en Tu Cuenta, si tienes una, y visitando la sección de configuración de la cuenta que te permite gestionar Tu información personal. También puedes contactarnos para solicitar acceso, corrección o eliminación de cualquier información personal que nos hayas proporcionado.</p>
    <p>Ten en cuenta, sin embargo, que es posible que debamos conservar cierta información cuando tengamos una obligación legal o una base legal para hacerlo.</p>
    <h3>Divulgación de Tus Datos Personales</h3>
    <h4>Transacciones Comerciales</h4>
    <p>Si la Compañía está involucrada en una fusión, adquisición o venta de activos, Tus Datos Personales pueden ser transferidos. Proporcionaremos aviso antes de que Tus Datos Personales sean transferidos y estén sujetos a una Política de Privacidad diferente.</p>
    <h4>Aplicación de la ley</h4>
    <p>Bajo ciertas circunstancias, la Compañía puede estar obligada a divulgar Tus Datos Personales si así lo requiere la ley o en respuesta a solicitudes válidas de autoridades públicas (por ejemplo, un tribunal o una agencia gubernamental).</p>
    <h4>Otros requisitos legales</h4>
    <p>La Compañía puede divulgar Tus Datos Personales en la creencia de buena fe de que dicha acción es necesaria para:</p>
    <ul>
    <li>Cumplir con una obligación legal</li>
    <li>Proteger y defender los derechos o propiedades de la Compañía</li>
    <li>Prevenir o investigar posibles actos ilícitos en relación con el Servicio</li>
    <li>Proteger la seguridad personal de los usuarios del Servicio o del público</li>
    <li>Proteger contra la responsabilidad legal</li>
    </ul>`,active: false  },
    { id: 6, title: 'Seguridad de Tus Datos Personales', content: `<p>La seguridad de Tus Datos Personales es importante para Nosotros, pero recuerda que ningún método de transmisión a través de Internet o método de almacenamiento electrónico es 100% seguro. Si bien nos esforzamos por utilizar medios comercialmente aceptables para proteger Tus Datos Personales, no podemos garantizar su seguridad absoluta.</p>
    <h2>Privacidad de los Niños</h2>
    <p>Nuestro Servicio no está dirigido a personas menores de 13 años. No recopilamos de manera consciente información personalmente identificable de personas menores de 13 años. Si eres padre o tutor y sabes que tu hijo nos ha proporcionado Datos Personales, por favor contáctanos. Si nos damos cuenta de que hemos recopilado Datos Personales de cualquier persona menor de 13 años sin verificación del consentimiento parental, tomamos medidas para eliminar esa información de nuestros servidores.</p>
    <p>Si necesitamos depender del consentimiento como base legal para procesar tu información y tu país requiere consentimiento de un padre, es posible que necesitemos el consentimiento de tus padres antes de recopilar y usar esa información.</p>
    <h2>Enlaces a Otros Sitios Web</h2>
    <p>Nuestro Servicio puede contener enlaces a otros sitios web que no son operados por Nosotros. Si haces clic en un enlace de un tercero, serás dirigido al sitio de ese tercero. Te recomendamos encarecidamente que revises la Política de Privacidad de cada sitio que visites.</p>
    <p>No tenemos control sobre y no asumimos responsabilidad por el contenido, políticas de privacidad o prácticas de sitios web o servicios de terceros.</p>
    <h2>Cambios en esta Política de Privacidad</h2>
    <p>Podemos actualizar Nuestra Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página.</p>
    <p>Te informaremos por correo electrónico y/o mediante un aviso destacado en Nuestro Servicio antes de que el cambio entre en vigencia y actualizaremos la fecha de "Última actualización" en la parte superior de esta Política de Privacidad.</p>
    <p>Se te recomienda revisar esta Política de Privacidad periódicamente para cualquier cambio. Los cambios en esta Política de Privacidad son efectivos cuando se publican en esta página.</p>
    `,active: false },
    { id: 7, title: 'Contáctanos', content: `<p>Si tienes alguna pregunta sobre esta Política de Privacidad, puedes contactarnos:</p>
    <ul>
    <li>Visitando esta página en nuestro sitio web: <a href="https://www.fullhouse.com/terms" rel="external nofollow noopener" target="_blank">http://www.fullhouse.com/terms</a></li>
    <li>Escribiendo al correo servicioalcliente@fullhouse.com</li>
    </ul>`,active: false  },
  ];

  const [sections, setSections] = useState(initialSections);
  const [activeSection, setActiveSection] = useState(sections[0]);

  const handleSectionClick = (section) => {
    const updatedSections = sections.map((s) => ({
      ...s,
      active: s.id === section.id,
    }));
    setSections(updatedSections);
    setActiveSection(section);
  };

  return (
    <div>
      <MenuComponent />
    <div className='body-terms'>
      <div className="section-buttons">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section)}
            className={section.active ? 'active' : ''}
          >
            <p>{section.title}</p>
          </button>
        ))}
      </div>
      <div className="section-content">
        <h2>{activeSection.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: activeSection.content }} />
      </div>
    </div>
    </div>
  );
}

export default TermsAndConditionsPage;
