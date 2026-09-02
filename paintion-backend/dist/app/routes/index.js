"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constructionProject_route_1 = require("../modules/constructionProject/constructionProject.route");
const contactInfo_route_1 = require("../modules/contactInfo/contactInfo.route");
const heroSlide_route_1 = require("../modules/heroSlider/heroSlide.route");
const team_router_1 = require("../modules/our-team/team.router");
const services_router_1 = require("../modules/services/services.router");
const auth_route_1 = require("../modules/user/auth.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: "/construction",
        routes: constructionProject_route_1.ConstructionProjectRoutes
    },
    {
        path: "/services",
        routes: services_router_1.ServiceRoutes
    },
    {
        path: "/hero-slides",
        routes: heroSlide_route_1.HeroSlideRoutes
    },
    {
        path: "/contact-info",
        routes: contactInfo_route_1.ContactInfoRoutes
    },
    {
        path: "/team",
        routes: team_router_1.TeamRoutes
    },
    {
        path: "/auth",
        routes: auth_route_1.AuthRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
