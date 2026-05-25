export interface Route {
  route_display_name?: string | null;
  route_icon?: string | null;
  route_id?: string | null;
  route_name?: string | null;
  route_order?: number | null;
  route_path?: string | null;
  route_redirect?: string | null;
  route_redirect_to?: string | null;
  route_type?: string | null;
  routed_id: string;
  routes?: Route[] | null;
}
