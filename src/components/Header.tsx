import { Package, LogOut, Trash2, Settings } from 'lucide-react';
import { NavLink } from './NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors">
            <Package className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ProjectHub</span>
          </NavLink>
          <nav className="flex items-center gap-4">
            <NavLink
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              Projects
            </NavLink>
            <NavLink
              to="/deleted"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              activeClassName="text-foreground"
            >
              <Trash2 className="h-4 w-4" />
              Deleted
            </NavLink>
            {user && (
              <div className="flex items-center gap-2">
                <NavLink to="/settings">
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </NavLink>
                <span className="text-sm text-muted-foreground hidden md:block">{user.email}</span>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
