import React from 'react';
import List from '@material-ui/core/List';

import {NavItemProps} from '../../../../modules/routesConfig';
import VerticalCollapse from './VerticalCollapse';
import VerticalItem from './VerticalItem';
import VerticalNavGroup from './VerticalNavGroup';
import { useUser } from 'shared/hooks/UserContext';

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const userContext = useUser();
  if (!userContext) {
    // Handle the case where user context is not available yet
    return null;
  }
  const { accessRulesNav } = userContext;
  return (
    <List>
      {accessRulesNav.map((item: NavItemProps) => (
        <React.Fragment key={item.id}>
          {item.type === 'group' && <VerticalNavGroup item={item} level={0} />}

          {item.type === 'collapse' && (
            <VerticalCollapse item={item} level={0} />
          )}

          {item.type === 'item' && <VerticalItem item={item} level={0} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default Navigation;
