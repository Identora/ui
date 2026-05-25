import { ComponentRoute } from '@identora/ui/routing';

export const BASE_COMPONENTS: ComponentRoute[] = [
  {
    route_id: 'b06c2784-eb29-4747-b118-53687c382cf7',
    component: async () => (await import('./features/home/home.component')).HomeComponent,
  },

  // About
  {
    route_id: 'd6a30f9c-8454-4c00-93bf-ca355cd29f29',
    component: async () => (await import('./features/about/about-info/about-info.component')).AboutInfoComponent,
  },
  {
    route_id: '86b87583-32bf-49cb-8da1-f9088dea230f',
    component: async () => (await import('./features/about/about-resources/about-resources.component')).AboutResourcesComponent,
  },

  // Settings
  {
    route_id: '2d71fb9b-2a44-4e95-a53c-2f403fa89fce',
    component: async () => (await import('./features/settings/general/info/info.component')).InfoComponent,
  },
  {
    route_id: '48ebca20-25de-4c72-a15e-19419d9d566b',
    component: async () => (await import('./features/settings/general/resources/resources.component')).ResourcesComponent,
  },
  {
    route_id: '662a7a61-44ac-4c8a-a35e-78c22069f081',
    component: async () => (await import('./features/settings/auth/token/token.component')).TokenComponent,
  },
  {
    route_id: 'e7d9982b-6eaf-4704-ba19-beb603bcb37f',
    component: async () => (await import('./features/settings/display/time/time.component')).TimeComponent,
  },
  {
    route_id: 'bf8a9f69-0f27-4496-8c21-bd88e9594cc5',
    component: async () => (await import('./features/settings/notifications/notifications.component')).NotificationsComponent,
  },

];
