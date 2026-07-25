import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type IconProps = ComponentPropsWithoutRef<'svg'> & { children: ReactNode }

function Icon({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  )
}

export function GearIcon() {
  return (
    <Icon>
      <svg width="24" height="24" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_25_444)">
          <path d="M27.9125 18.8708C27.9708 18.4333 28 17.9812 28 17.5C28 17.0333 27.9708 16.5667 27.8979 16.1292L30.8583 13.825C31.1208 13.6208 31.1937 13.2271 31.0333 12.9354L28.2333 8.09375C28.0583 7.77292 27.6937 7.67083 27.3729 7.77292L23.8875 9.17292C23.1583 8.61875 22.3854 8.15208 21.525 7.80208L21 4.09792C20.9417 3.74792 20.65 3.5 20.3 3.5H14.7C14.35 3.5 14.0729 3.74792 14.0146 4.09792L13.4896 7.80208C12.6292 8.15208 11.8417 8.63333 11.1271 9.17292L7.64166 7.77292C7.32083 7.65625 6.95625 7.77292 6.78125 8.09375L3.99583 12.9354C3.82083 13.2417 3.87916 13.6208 4.17083 13.825L7.13125 16.1292C7.05833 16.5667 7 17.0479 7 17.5C7 17.9521 7.02916 18.4333 7.10208 18.8708L4.14166 21.175C3.87916 21.3792 3.80625 21.7729 3.96666 22.0646L6.76666 26.9062C6.94166 27.2271 7.30625 27.3292 7.62708 27.2271L11.1125 25.8271C11.8417 26.3812 12.6146 26.8479 13.475 27.1979L14 30.9021C14.0729 31.2521 14.35 31.5 14.7 31.5H20.3C20.65 31.5 20.9417 31.2521 20.9854 30.9021L21.5104 27.1979C22.3708 26.8479 23.1583 26.3812 23.8729 25.8271L27.3583 27.2271C27.6792 27.3438 28.0437 27.2271 28.2187 26.9062L31.0187 22.0646C31.1937 21.7437 31.1208 21.3792 30.8437 21.175L27.9125 18.8708ZM17.5 22.75C14.6125 22.75 12.25 20.3875 12.25 17.5C12.25 14.6125 14.6125 12.25 17.5 12.25C20.3875 12.25 22.75 14.6125 22.75 17.5C22.75 20.3875 20.3875 22.75 17.5 22.75Z" fill="black" />
        </g>
        <defs>
          <clipPath id="clip0_25_444">
            <rect width="35" height="35" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Icon>
  )
}

export function PlusIcon() {
  return (
    <Icon>
      <svg width="24" height="24" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_25_454)">
          <path d="M17.5 2.91666C9.45 2.91666 2.91667 9.44999 2.91667 17.5C2.91667 25.55 9.45 32.0833 17.5 32.0833C25.55 32.0833 32.0833 25.55 32.0833 17.5C32.0833 9.44999 25.55 2.91666 17.5 2.91666ZM24.7917 18.9583H18.9583V24.7917H16.0417V18.9583H10.2083V16.0417H16.0417V10.2083H18.9583V16.0417H24.7917V18.9583Z" fill="black" />
        </g>
        <defs>
          <clipPath id="clip0_25_454">
            <rect width="35" height="35" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Icon>
  )
}

export function PencilIcon() {
  return (
    <Icon>
      {/* 19 units of artwork in Icon's 24-unit viewport. A nested <svg>
          defaults to x=0 y=0, so without the offset it sits in the corner. */}
      <svg x="2.5" y="2.5" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 14.8464V18.7526H3.90625L15.4271 7.23177L11.5208 3.32552L0 14.8464ZM18.4479 4.21094C18.8542 3.80469 18.8542 3.14844 18.4479 2.74219L16.0104 0.304688C15.6042 -0.101563 14.9479 -0.101563 14.5417 0.304688L12.6354 2.21094L16.5417 6.11719L18.4479 4.21094Z" fill="black" />
      </svg>
    </Icon>
  )
}

export function TrashIcon() {
  return (
    <Icon>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="black" fill-opacity="0.54" />
      </svg>
    </Icon>
  )
}

export function BoxIcon({ checked = false }: { checked?: boolean }) {
  return (
    <Icon>
      {
        checked ?
          <svg width="24" height="24" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_25_347)">
              <path d="M76 12H20C15.56 12 12 15.6 12 20V76C12 80.4 15.56 84 20 84H76C80.44 84 84 80.4 84 76V20C84 15.6 80.44 12 76 12ZM40 68L20 48L25.64 42.36L40 56.68L70.36 26.32L76 32L40 68Z" fill="black" />
            </g>
            <defs>
              <clipPath id="clip0_25_347">
                <rect width="96" height="96" fill="white" />
              </clipPath>
            </defs>
          </svg>
          :
          <svg width="24" height="24" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_25_346)">
              <path d="M76 20V76H20V20H76ZM76 12H20C15.6 12 12 15.6 12 20V76C12 80.4 15.6 84 20 84H76C80.4 84 84 80.4 84 76V20C84 15.6 80.4 12 76 12Z" fill="black" />
            </g>
            <defs>
              <clipPath id="clip0_25_346">
                <rect width="96" height="96" fill="white" />
              </clipPath>
            </defs>
          </svg>
      }
    </Icon >
  )
}

export function CalendarIcon(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <Icon viewBox="0 0 25 25" {...props}>
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_39_316)">
          <path d="M19.7917 3.12502H18.75V1.04169H16.6667V3.12502H8.33333V1.04169H6.25V3.12502H5.20833C4.05208 3.12502 3.13542 4.06252 3.13542 5.20835L3.125 19.7917C3.125 20.9375 4.05208 21.875 5.20833 21.875H19.7917C20.9375 21.875 21.875 20.9375 21.875 19.7917V5.20835C21.875 4.06252 20.9375 3.12502 19.7917 3.12502ZM19.7917 19.7917H5.20833V8.33335H19.7917V19.7917ZM7.29167 10.4167H12.5V15.625H7.29167V10.4167Z" fill="black" />
        </g>
        <defs>
          <clipPath id="clip0_39_316">
            <rect width="25" height="25" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Icon>
  )
}

export function BackIcon() {
  return (
    <Icon>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2773_95)">
          <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z" fill="black" fill-opacity="0.87" />
        </g>
        <defs>
          <clipPath id="clip0_2773_95">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Icon>
  )
}
