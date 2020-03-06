import React from "react";
import "./layout.css";
import classNames from "../../util/classNames";

interface Props {
  className?: string;
  innerRef?: React.MutableRefObject<HTMLDivElement | null>;
}

const Grid: React.FC<Props> = ({ children, className, innerRef }) => (
  <div ref={innerRef} className={classNames({}, "layout--grid", className)}>
    {children}
  </div>
);

const Header: React.FC<Props> = ({ children, className, innerRef }) => (
  <div ref={innerRef} className={classNames({}, "layout--header", className)}>
    {children}
  </div>
);

const Content: React.FC<Props> = ({ children, className, innerRef }) => (
  <div ref={innerRef} className={classNames({}, "layout--content", className)}>
    {children}
  </div>
);

const Footer: React.FC<Props> = ({ children, className, innerRef }) => (
  <div ref={innerRef} className={classNames({}, "layout--footer", className)}>
    {children}
  </div>
);

const Layout = {
  Grid,
  Header,
  Content,
  Footer
};

export default Layout;
