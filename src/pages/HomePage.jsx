import React from 'react';
import { Footer, Header, HomeMainLayout } from '../components';
import { UserService } from '../services/network';

import bodyLineImg from '../resources/images/body-lines.jpg';
import creamImg from '../resources/images/cream.jpg';
import lipsImg from '../resources/images/lips.jpg';
import naturalnessImg from '../resources/images/naturalness.jpg';
import olderWomanImg from '../resources/images/older-woman.jpg';

const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        <HomeMainLayout
          textContent="Добро пожаловать в наш бьюти-салон! Мы рады приветствовать вас на странице нашего сайта. Наш салон - это место, где вы сможете расслабиться, забыть о повседневных заботах и посвятить время уходу за своей красотой и здоровьем."
          imgTage={<img src={naturalnessImg} />}
        />
        <HomeMainLayout
          type="reverse"
          textContent="Интересно знать, что бьюти-салон - это не просто место, где можно привести себя в порядок, но и уютное пространство, где можно отдохнуть и расслабиться. Мы предлагаем нашим клиентам полный спектр услуг, начиная от процедур по уходу за кожей лица и тела, до маникюра, педикюра, наращивания ресниц и макияжа."
          imgTage={<img src={bodyLineImg} />}
        />
        <HomeMainLayout
          textContent="Бронирование процедур можно осуществить как онлайн на нашем сайте, так и по телефону. Мы работаем удобные для вас часы, чтобы вы могли найти время для заботы о себе в любое удобное для вас время."
          imgTage={<img src={creamImg} />}
        />
        <HomeMainLayout
          type="reverse"
          textContent="Мы приглашаем вас насладиться нашими услугами, попробовать новые процедуры и насладиться атмосферой нашего салона. Забудьте о суете и стрессе, дайте себе возможность заботиться о себе и расслабиться."
          imgTage={<img src={olderWomanImg} />}
        />
        <HomeMainLayout
          textContent="У нас вы найдете индивидуальный подход к каждому клиенту, атмосферу уюта и расслабленности, а также приятные бонусы и акции. Наша главная цель - сделать наших клиентов счастливыми и уверенными в своей красоте и здоровье."
          imgTage={<img src={lipsImg} />}
        />
        
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
