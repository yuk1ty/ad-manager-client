import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { StandardLayout } from "../../components/context/StandardLayout";

export function Dashboard() {
  return (
    <div>
      <Header />
      <StandardLayout title="Dashboard">
        <p>
          <Link to="/login">Please login.</Link>
        </p>
      </StandardLayout>
    </div>
  );
}
