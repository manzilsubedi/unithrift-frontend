"use client";
import React from "react";

import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import SignUp from "../components/auth/signUp";
import SignIn from "../components/auth/signIn";

export default function App() {
  const [selected, setSelected] = React.useState<string | number>("login");

  return (
    <div className="flex flex-col  justify-between items-center ">
      <div className=" py-10">
        <h1 className=" font-bold text-4xl text-teal-600">{process.env.NEXT_PUBLIC_SITE_TITLE}</h1>
      </div>
      <div className=" px-4">
        <Tabs
          fullWidth
          size="md"
          aria-label="Tabs form"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab key="login" title="Login" className="flex justify-center">
            <Card className="max-w-full w-[340px]">
              <CardBody className="">
                <SignIn setSelected={setSelected} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="sign-up" title="Sign up" className="flex justify-center">
            <Card className="max-w-full w-[340px] h-[600px]">
              <CardBody className="">
                <SignUp setSelected={setSelected} />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
