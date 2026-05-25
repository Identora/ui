import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule, ClrButtonModule, ClrIconModule } from '@clr/angular';
import { CdsModule } from '@cds/angular';

import {
  loadChartIconSet, loadCommerceIconSet, loadCoreIconSet, loadEssentialIconSet,
  loadMediaIconSet, loadMiniIconSet, loadSocialIconSet, loadTechnologyIconSet,
  loadTextEditIconSet, loadTravelIconSet,
} from '@cds/core/icon';

loadChartIconSet();
loadCommerceIconSet();
loadCoreIconSet();
loadEssentialIconSet();
loadMediaIconSet();
loadMiniIconSet();
loadSocialIconSet();
loadTechnologyIconSet();
loadTextEditIconSet();
loadTravelIconSet();

@NgModule({
  imports: [ClarityModule, ClrButtonModule, ClrIconModule, CdsModule],
  exports: [ClarityModule, ClrButtonModule, ClrIconModule, CdsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClaritySharedModule {}
