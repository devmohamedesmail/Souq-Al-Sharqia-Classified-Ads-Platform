import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Newspaper, Scroll, Settings, Notebook ,MapPinHouse,BookCheck, Users} from 'lucide-react';
import AppLogo from './app-logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';



export function AppSidebar() {
    const { t } = useTranslation();

    const mainNavItems: NavItem[] = [
        {
            title: t('dashboard'),
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: t('users'),
            href: '/users',
            icon: Users,
        },
        {
            title: t('settings'),
            href: '/settings/page',
            icon: Settings,
        },
        {
            title: t('places'),
            href: '/places/page',
            icon: MapPinHouse,
        },
        {
            title: t('categories'),
            href: '/categories/page',
            icon: BookCheck,
        },
        {
            title: t('subcategories'),
            href: '/subcategories/page',
            icon: BookCheck,
        },
        {
            title: t('ads'),
            href: '/ads/page',
            icon: BookCheck,
        },
        {
            title: t('orders'),
            href: '/orders/page',
            icon: BookCheck,
        },
    ];

    const footerNavItems: NavItem[] = [


    ];



    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>

                        </SidebarMenuButton>

                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>
            <LanguageSwitcher />
            <SidebarFooter>

                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
