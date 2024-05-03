import React from "react";

export function H1(props: any) {
  return <h1 className="my-2 text-2xl font-bold text-white" {...props} />;
}

export function H2(props: any) {
  return <h2 className="my-2 text-lg font-semibold text-white" {...props} />;
}

export function H3(props: any) {
  return <h3 className="text-base font-semibold text-white" {...props} />;
}

export function P(props: any) {
  return <p className="text-base leading-6 text-neutral-200" {...props} />;
}

export function Ul(props: any) {
  return <ul className="list-inside list-disc text-base leading-6 text-neutral-200" {...props} />;
}

export function Ol(props: any) {
  return <ol className="list-decimal text-base leading-6 text-neutral-200" {...props} />;
}

export function Li(props: any) {
  return <li className="my-1 text-base leading-6" {...props} />;
}

const DesignSystem = {
  H1,
  H2,
  H3,
  P,
  Ul,
  Ol,
  Li,
};

export default DesignSystem;