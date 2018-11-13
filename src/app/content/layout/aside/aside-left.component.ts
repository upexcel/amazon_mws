import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Inject, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { MenuAsideOffcanvasDirective } from '../../../core/directives/menu-aside-offcanvas.directive';
import { ClassInitService } from '../../../core/services/class-init.service';
import { LayoutConfigService } from '../../../core/services/layout-config.service';
import { LayoutRefService } from '../../../core/services/layout/layout-ref.service';
import { MenuAsideService } from '../../../core/services/layout/menu-aside.service';
import { DOCUMENT } from '@angular/common';

@Component({
	selector: 'm-aside-left',
	templateUrl: './aside-left.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideLeftComponent implements OnInit, AfterViewInit {

	@HostBinding('class') classes = 'm-grid__item m-aside-left';
	@HostBinding('id') id = 'm_aside_left';

	@HostBinding('attr.mMenuAsideOffcanvas') mMenuAsideOffcanvas: MenuAsideOffcanvasDirective;

	currentRouteUrl: string = '';
	insideTm: any;
	outsideTm: any;
	menuList = [
		{
			title: 'Dashboard',
			desc: 'Some description goes here',
			root: true,
			icon: 'flaticon-line-graph',
			page: '/',
			badge: { type: 'm-badge--danger', value: '2' },
			translate: 'MENU.DASHBOARD',
		},
		{
			title: 'P&L',
			root: true,
			page: '/p&l',
			
		},
		{
			title: 'P&L DataList',
			root: true,
			page: '/p&lDataList',
			
		},
		{
			title: 'product',
			root: true,
			page: '/product',
			
		},
		{
			title: 'shipment',
			root: true,
			page: '/shipment',
			
		},
	];
	constructor(
		private el: ElementRef,
		public classInitService: ClassInitService,
		public menuAsideService: MenuAsideService,
		public layoutConfigService: LayoutConfigService,
		private router: Router,
		private layoutRefService: LayoutRefService,
		@Inject(DOCUMENT) private document: Document,
	) {
		// subscribe to menu classes update
		this.classInitService.onClassesUpdated$.subscribe(classes => {
			// join the classes array and pass to variable
			this.classes = 'm-grid__item m-aside-left ' + classes.aside_left.join(' ');
		});
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.mMenuAsideOffcanvas = new MenuAsideOffcanvasDirective(this.el);
			// manually call the directives' lifecycle hook method
			this.mMenuAsideOffcanvas.ngAfterViewInit();

			// keep aside left element reference
			this.layoutRefService.addElement('asideLeft', this.el.nativeElement);
		});
	}

	async ngOnInit() {
		this.currentRouteUrl = this.router.url.split(/[?#]/)[0];

		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => this.currentRouteUrl = this.router.url.split(/[?#]/)[0]);
	}

	formatMenu(tags: any) {
		tags.forEach(tag => {
			if (tag['title'] === 'candidate') {
				tag['data'].forEach(jobProfiles => {
					jobProfiles['subchild'].forEach(subchild => {
						if (subchild['unread']) {
							subchild['badge'] = { type: 'm-badge--danger', value: subchild['unread'] };
						}
					});
					jobProfiles['submenu'] = jobProfiles['subchild'];
				});
				this.menuList[1]['submenu'] = tag['data'];
			} else {
				tag['data'].forEach(jobProfiles => {
					if (jobProfiles['unread']) {
						jobProfiles['badge'] = { type: 'm-badge--danger', value: jobProfiles['unread'] };
					}
					this.menuList[1]['submenu'].push(jobProfiles);
				});
			}
		});
	}

	isMenuItemIsActive(item): boolean {
		if (item.submenu) {
			return this.isMenuRootItemIsActive(item);
		}

		if (!item.page) {
			return false;
		}

		// dashboard
		if (item.page !== '/' && this.currentRouteUrl.startsWith(item.page)) {
			return true;
		}
		return this.currentRouteUrl === item.page;
	}

	isMenuRootItemIsActive(item): boolean {
		let result: boolean = false;

		for (const subItem of item.submenu) {
			result = this.isMenuItemIsActive(subItem);
			if (result) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Use for fixed left aside menu, to show menu on mouseenter event.
	 * @param e Event
	 */
	mouseEnter(e: Event) {
		// check if the left aside menu is fixed
		if (this.document.body.classList.contains('m-aside-left--fixed')) {
			if (this.outsideTm) {
				clearTimeout(this.outsideTm);
				this.outsideTm = null;
			}

			this.insideTm = setTimeout(() => {
				// if the left aside menu is minimized
				if (this.document.body.classList.contains('m-aside-left--minimize') && mUtil.isInResponsiveRange('desktop')) {
					// show the left aside menu
					this.document.body.classList.remove('m-aside-left--minimize');
					this.document.body.classList.add('m-aside-left--minimize-hover');
				}
			}, 300);
		}
	}

	/**
	 * Use for fixed left aside menu, to show menu on mouseenter event.
	 * @param e Event
	 */
	mouseLeave(e: Event) {
		if (this.document.body.classList.contains('m-aside-left--fixed')) {
			if (this.insideTm) {
				clearTimeout(this.insideTm);
				this.insideTm = null;
			}

			this.outsideTm = setTimeout(() => {
				// if the left aside menu is expand
				if (this.document.body.classList.contains('m-aside-left--minimize-hover') && mUtil.isInResponsiveRange('desktop')) {
					// hide back the left aside menu
					this.document.body.classList.remove('m-aside-left--minimize-hover');
					this.document.body.classList.add('m-aside-left--minimize');
				}
			}, 500);
		}
	}
}
