"use client";

import { signOut } from "next-auth/react";


import Button from "@/components/shared/Button/Button";

export default function UserButton() {
  return (
    <>
      <Button btnType='black' onClick={() => signOut()} text='Sign Out' />
    </>
  );
}
