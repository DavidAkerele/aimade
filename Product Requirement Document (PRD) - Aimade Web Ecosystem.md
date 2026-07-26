# **Product Requirement Document (PRD)**

## **Project Name: Aimade Web Ecosystem**

## **1\. Executive Summary & Vision**

### **1.1 Overview**

**Aimade** is a dynamic multi-service brand operating across three distinct verticals:

> * **Aimade Events:** Premier event management, logistics, and rental services.  
> * **Aimade Flavors:** Authentic culinary services specializing in Nigerian cuisine and custom orders.  
> * **Aimade Care Foundation:** A non-profit initiative focused on empowering vulnerable and displaced girls, young women, and widows through skill acquisition and support.

### **1.2 Objective**

To build a scalable, high-performance web platform that seamlessly presents all three brands under the central **Aimade** umbrella while providing a unified, role-based Content Management System (CMS / Admin Panel) for backend administration.

## **2\. Core Architecture & User Flow**

The platform follows a centralized hub model branching into dedicated brand verticals, all managed by a unified backend administration panel:  
                        `[ Aimade Homepage ]`  
                                `|`  
       `+------------------------+------------------------+`  
       `|                        |                        |`  
`[ Aimade Events ]      [ Aimade Flavors ]     [ Aimade Foundation ]`  
`(Catalog & Inquiry)     (Menu & Booking)        (Impact & Direct Support)`  
       `|                        |                        |`  
       `+------------------------+------------------------+`  
                                `|`  
                     `[ Central Admin Panel ]`

## **3\. Module & Feature Specifications**

### **3.1 Global Elements (Brand & Navigation)**

> * **Universal Header / Navbar:** Brand switcher/dropdown to hop smoothly between *Events*, *Flavors*, and *Care Foundation*, along with a unified contact CTA button.  
> * **Central Landing Page:** Hero section introducing the overarching Aimade ecosystem with three interactive brand cards redirecting users to their respective sub-sites or sections.  
> * **Universal Footer:** Legal links, social media links, newsletter sign-up, and quick navigation links.

### **3.2 Vertical 1: Aimade Events & Rentals**

This module handles all event planning, logistics, and equipment rentals.

> * **Service Overview:** Highlighting event planning, styling, and management capabilities.  
> * **Dynamic Rental Catalog:**  
  * Categorized inventory items including canopies, chairs, tables, cooking/water drums, sound systems, and decor.  
  * Item details: Name, specifications (e.g., canopy dimensions), pricing per day/event, availability status, and high-resolution image gallery.  
> * **Interactive Rental Calculator / Inquiry Basket:** Allows users to select rental items, specify quantities and rental dates, and generate an estimated quote before submitting an inquiry.  
> * **Booking / Inquiry Form:** Direct booking requests with date pickers, location fields, and custom request text boxes.

### **3.3 Vertical 2: Aimade Flavors**

This module manages culinary offerings and meal bookings.

> * **Interactive Digital Menu:**  
  * Categorized food offerings including Signature Dishes, Soups & Stews, Rice Dishes, Party Orders, and Custom Meals.  
  * Featured authentic Nigerian meals: Afang Soup, Jollof Rice, Fried Rice, Ayamasi, Ewa Aganyin, and custom meal requests.  
> * **Item Specifications:** Portion sizes (e.g., Per Plate, 2L Tub, 4L Tub, Bulk Party Sizes), pricing tiers, and dietary/ingredient callouts.  
> * **Custom Catering & Booking Request:** Form for bulk event catering or tailored meal prep requests, complete with a date and time selector for pre-orders.

### **3.4 Vertical 3: Aimade Care Foundation**

This module showcases the non-profit initiatives and empowerment programs.

> * **Mission & Impact Overview:** Storytelling section highlighting support for displaced females, young girls, and widows, alongside key impact metrics (e.g., number of girls empowered, programs completed).  
> * **Skill Acquisition & Programs Gallery:** Showcase of ongoing and past workshops or empowerment bootcamps using photo and video galleries.  
> * **Support / Contact Portal:** Volunteer registration forms and donation/sponsorship inquiry forms.

## **4\. Centralized Admin Panel (CMS)**

A secure, password-protected backend accessible by designated managers to update content dynamically across all three verticals without requiring developer intervention.

| Admin Module | Key Functionalities | Target Content   |
| :---- | :---- | :---- |
| **Rental Management** | Full CRUD operations (Create, Read, Update, Delete) | Canopy sizes, chair counts, water drums, pricing, and availability status. |
| **Menu & Order Management** | CRUD operations for food items & pricing tiers | Dishes, pricing, portion sizes, and availability toggles (Available / Sold Out). |
| **Content & Media Management** | Media upload & story publishing | Foundation impact metrics, story articles, workshop galleries, and event photos. |
| **Global Inquiries Dashboard** | Centralized inbox & lead tracking | Consolidated queries from Events, Food Catering, and Foundation forms. |

## **5\. Non-Functional Requirements**

> * **Responsiveness:** Mobile-first architecture ensuring flawless navigation on smartphones, tablets, and desktops.  
> * **Performance & Speed:** Fast image loading optimized for high-resolution galleries (rental equipment and food imagery).  
> * **SEO Optimization:** Unique meta-tags and structured data for each vertical to ensure localized search ranking (e.g., rental searches vs. food catering searches).  
> * **Security:** SSL Encryption, secure admin authentication (JWT/OAuth), and protected media storage.

## **6\. Technical Stack Recommendations**

> * **Frontend:** Next.js / React with Tailwind CSS for rapid rendering and distinct sub-page routing.  
> * **Backend & CMS:** Node.js / Express or Headless CMS (Payload CMS, Strapi, or Sanity.io) for effortless admin panel generation.  
> * **Database:** PostgreSQL or MongoDB for relational rental and menu data.  
> * **Media Storage:** Cloudinary or AWS S3 for hosting high-quality event and menu photos.