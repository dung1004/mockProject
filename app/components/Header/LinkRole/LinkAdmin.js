import React from 'react';

import NavBar from '../NavBar';
import LinkHeader from '../LinkHeader';
import MenuLink from '../MenuLink';

function LinkAdmin() {
  return (
    <MenuLink>
      <NavBar>
        <LinkHeader exact to="/">
          Trang Chủ
        </LinkHeader>
      </NavBar>
      <NavBar>
        <LinkHeader to="/staff">Nhân Viên</LinkHeader>
      </NavBar>
      <NavBar>
        <LinkHeader to="/teacher">Giáo Viên</LinkHeader>
      </NavBar>
      <NavBar>
        <LinkHeader to="/student">Học Viên</LinkHeader>
      </NavBar>
      <NavBar>
        <LinkHeader exact to="/class">
          Lớp Học
        </LinkHeader>
      </NavBar>
    </MenuLink>
  );
}

export default LinkAdmin;
