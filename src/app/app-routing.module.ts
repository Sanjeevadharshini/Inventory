import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const AppRoutes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'product', loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule), canActivate: [AuthGuard] },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'stock', loadChildren: () => import('./modules/stock/stock.module').then(m => m.StockModule), canActivate: [AuthGuard] },
  { path: 'supplier', loadChildren: () => import('./modules/supplier/supplier.module').then(m => m.SupplierModule), canActivate: [AuthGuard] },
  { path: 'customer', loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule), canActivate: [AuthGuard] },
  { path: 'order', loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule), canActivate: [AuthGuard] },
  { path: 'reports', loadChildren: () => import('./modules/report/reports.module').then(m => m.ReportsModule), canActivate: [AuthGuard] },
  { path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule), canActivate: [AuthGuard] },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];;