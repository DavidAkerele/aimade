# **Design System & UI/UX Guidelines Document**

## **Project Name: Aimade Web Ecosystem**

## **1\. Overview & Brand Architecture**

The Aimade Web Ecosystem unifies three distinct sub-brands—Aimade Flavors, Aimade Events, and Aimade Care Foundation—under one digital platform. While each brand features a tailored, domain-specific visual identity designed to evoke specific emotions (appetite, trust/elegance, and compassion), the ecosystem maintains a unified structural framework, dynamic navigation component, and typography system.

## **2\. Typography & Layout System**

### **2.1 Typography Scale**

> * **Display Headings:** Plus Jakarta Sans or Syne (Bold/Extra Bold) – Modern, highly readable, dynamic curves.  
> * **Body Text & UI Controls:** Inter or DM Sans (Regular/Medium/SemiBold) – Clean, accessible, neutral body typography.

### **2.2 Layout & Grid Rules**

> * **Grid System:** 12-column responsive grid on desktop, 4-column grid on mobile.  
> * **Spacing Scale:** 8pt spatial grid (4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px).  
> * **Sub-brand Switcher Header:** Sticky, top navigation bar containing a brand selector tab (Flavors | Events | Care Foundation) that smoothly updates theme CSS variables upon switching.

## **3\. Sub-Brand Design Systems & Color Palettes**

### **3.1 Aimade Flavors (Catering & Culinary)**

**Design Philosophy & Industry Benchmark:** Drawing inspiration from premium food delivery interfaces and culinary showcase platforms on Dribbble and Awwwards (e.g., Grubhub redesigns, luxury restaurant digital menus, Pinterest food moodboards). The design utilizes warm, fresh tones that stimulate appetite, high-contrast imagery, and card-based culinary grids.

| Element | Color Name / HEX | Usage / Application   |
| :---- | :---- | :---- |
| **Primary Color** | Fresh Nigerian Palm Green (\#1E5631) | Headers, primary call-to-action buttons, active navigation states. |
| **Secondary / Neutral** | Clean Kitchen White (\#FFFFFF) & Soft Cream (\#F9F9F6) | Page background, meal card containers, clean whitespace. |
| **Accent Color** | Ripe Pepper Red (\#D62828) | Price tags, badge overlays (e.g., "Hot", "Popular"), sale alerts, dynamic hovers. |

#### **UI Component Patterns:**

> * **Food Display Cards:** Rounded corner cards (16px border-radius) with subtle elevation drops, vivid meal photos, portion size dropdowns, and an instant "Add to Order / Request Quote" button.  
> * **Interactive Filtering:** Categorized pills (Soups, Rice Dishes, Party Orders) with smooth horizontal drag/scroll on mobile.

### **3.2 Aimade Events (Rentals & Event Planning)**

**Design Philosophy & Industry Benchmark:** Drawing inspiration from high-end logistics and rental platforms on 21st.dev and Motion.ai. The design uses sharp, structured grids, micro-interactions, clean rental calculators, and crisp typography to project reliability, scale, and luxury event execution.

| Element | Color Name / HEX | Usage / Application   |
| :---- | :---- | :---- |
| **Primary Color** | Royal Navy Blue (\#0A2540) | Hero backgrounds, primary buttons, structural borders, main headings. |
| **Secondary / Neutral** | Pure White (\#FFFFFF) & Cool Slate Light (\#F4F6F8) | Catalog backgrounds, modal overlays, spec sheet tables. |
| **Accent Color** | Vibrant Event Red (\#E63946) | Availability alerts, stock counters, primary CTA hover states, date selection highlights. |

#### **UI Component Patterns:**

> * **Inventory Spec Sheets:** Clean table layouts detailing canopy dimensions, chair seating capacities, and water drum volume specifications.  
> * **Rental Basket Calculator:** Floating or sticky sidebar widget tracking selected inventory, calculating total rental estimates in real-time.

### **3.3 Aimade Care Foundation (NGO & Community Empowerment)**

**Design Philosophy & Industry Benchmark:** Drawing inspiration from empathetic social impact sites, non-profit portals, and Canva community layouts. Focuses on soft, uplifting color palettes, storytelling layouts, human portrait photo framing, clear impact metrics, and intuitive volunteer/donor pathways.

| Element | Color Name / HEX | Usage / Application   |
| :---- | :---- | :---- |
| **Primary Color** | Empowerment Deep Purple (\#4A154B) | Section headers, impactful quotes, volunteer pathway buttons. |
| **Secondary Color** | Gentle Lilac (\#C8B6E2) | Card backgrounds, feature highlights, subtle tags, icon backdrops. |
| **Accent Color** | Soft Pastel Pink (\#FFD1DC) | Empowerment badges, secondary buttons, warm banner fills. |
| **Base / Canvas** | Pure White (\#FFFFFF) & Soft Blush Neutral (\#FAFAFC) | Main content canvas, background contrast panels. |

#### **UI Component Patterns:**

> * **Impact Metrics Cards:** Large statistical numbers (e.g., "500+ Girls Empowered") with soft lilac gradient cards and pastel pink iconography.  
> * **Storytelling Photo Grays/Galleries:** Asymmetric masonry galleries displaying skill acquisition workshops and community initiatives.

## **4\. Motion, Interaction & Components (Motion.ai & 21st.dev Style)**

> * **Theme Switch Transitions:** When switching between sub-brands via the universal header, theme variables transition over 300ms cubic-bezier curve for a seamless visual shift.  
> * **Micro-Interactions:** Button hover scale (1.02x), subtle card lift effects (box-shadow expansion), and smooth dropdown accordion expansions.  
> * **Form Fields & Controls:** Custom styled date pickers, quantity incrementors (+ / \- counters for rental equipment), and dynamic price tally animations.

## **5\. Responsive Behavior & Accessibility (WCAG 2.1 AAA)**

> * **Color Contrast:** All text-to-background combinations meet or exceed AAA contrast standards (minimum 4.5:1 ratio for normal text).  
> * **Mobile Navigation:** Bottom navigation bar on mobile for rapid switching between catalog, menu, impact gallery, and global cart/inquiry basket.  
> * **Keyboard Navigation & Screen Readers:** Full focus state styling using high-contrast outline rings for all interactive buttons and form inputs.