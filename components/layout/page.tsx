import React, { FunctionComponent } from 'react';

import styles from  './sass/page.module.scss';

type PageProps = {
};

const Page:FunctionComponent<PageProps> = ({ children }) => {
  return (
    <div className={styles.page}>
      { children }
    </div>
  );
};

export default Page;