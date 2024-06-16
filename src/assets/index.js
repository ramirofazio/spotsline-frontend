export const images = {
  landingBg: "/images/landing-background.webp",
  signInBackground: "/images/sign-in-background.webp",
  logoWhite: "/images/logoWhite.webp",
  logoBlack: "/images/logoBlack.webp",
  logoYellow: "/images/logoYellow.webp",
  logoWithDescription: "/images/logoWithDescription.webp",
  empresa: "/images/empresa.webp",
  empresaScaled: "/images/empresa-scaled.webp",
  empresaWorkspace1: "/images/empresa-workspace-1.webp",
  empresaWorkspace2: "/images/empresa-workspace-2.webp",
  empresaWorkspace3: "/images/empresa-workspace-3.webp",
};

//! USO DE IMAGENES CON AWS DEPRECADO!
const BASE_AWS_URL = "https://spotsline-bucket.s3.amazonaws.com";

export const assets = {
  logos: {
    logoWithSlogan: `${BASE_AWS_URL}/logoWithSlogan.png`,
    logoBlack: `${BASE_AWS_URL}/logoBlack.png`,
    logoYellow: `${BASE_AWS_URL}/logoYellow.png`,
    logoWhite: `${BASE_AWS_URL}/logoWhite.png`,
  },
  backgrounds: {
    1: `${BASE_AWS_URL}/landingbg.jpg`,
    2: `${BASE_AWS_URL}/empresa2.png`,
    3: `${BASE_AWS_URL}/empresa-trabajador.jpg`,
    4: `${BASE_AWS_URL}/empresa-scaled.jpg`,
    5: `${BASE_AWS_URL}/sign-in.png`,
  },
  lights: {
    hole7: `${BASE_AWS_URL}/Hole7.png`,
    cinema3: `${BASE_AWS_URL}/Cinema3.png`,
    light: `${BASE_AWS_URL}/light.png`,
    light2: `${BASE_AWS_URL}/light2.png`,
    light3: `${BASE_AWS_URL}/light3.png`,
  },
  rrhh: {
    1: `${BASE_AWS_URL}/rrhh/rrhh-01.jpg`,
    2: `${BASE_AWS_URL}/rrhh/rrhh-02.jpg`,
    3: `${BASE_AWS_URL}/rrhh/rrhh-03.jpg`,
    4: `${BASE_AWS_URL}/rrhh/rrhh-04.jpg`,
    5: `${BASE_AWS_URL}/rrhh/rrhh-05.jpg`,
    7: `${BASE_AWS_URL}/rrhh/rrhh-07.jpg`,
  },
};
