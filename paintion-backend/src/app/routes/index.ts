import express from 'express';
import { ConstructionProjectRoutes } from '../modules/constructionProject/constructionProject.route';
import { ContactInfoRoutes } from '../modules/contactInfo/contactInfo.route';
import { ContactMessageRoutes } from '../modules/contactMessage/contactMessage.route';
import { HeroSlideRoutes } from '../modules/heroSlider/heroSlide.route';
import { TeamRoutes } from '../modules/our-team/team.router';
import { ServiceRoutes } from '../modules/services/services.router';
import { AuthRoutes } from '../modules/user/auth.route';



const router = express.Router();

const moduleRoutes = [
  // ... routes
  
  {
    path: "/construction",
    routes: ConstructionProjectRoutes
  },
  {
    path: "/services",
    routes: ServiceRoutes
  },
  {
    path: "/hero-slides",
    routes: HeroSlideRoutes
  },
  {
    path: "/contact-info",
    routes: ContactInfoRoutes
  },
  {
    path: "/contact-message",
    routes: ContactMessageRoutes
  },
  {
    path: "/team",
    routes: TeamRoutes
  },
  {
    path: "/auth",
    routes: AuthRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
