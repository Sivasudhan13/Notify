import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <div style={{ backgroundColor: "#9d31f1" }} className="border-b">
      <div
        className="navbar shadow-sm px-11"
        style={{ backgroundColor: "#9d31f1" }}
      >
        {/* Logo / Title */}
        <div className="flex-1">
          <a className="text-2xl font-bold" style={{ color: "#f9f2ff" }}>
            Notify
          </a>
        </div>

        {/* Right Menu */}
        <div className="flex-none">
          <div className="menu menu-horizontal px-1">
            <Link
              to={"/create"}
              className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium shadow-md transition"
              style={{
                backgroundColor: "#f9f2ff",
                color: "#9d31f1",
              }}
            >
              <Plus className="size-5" />
              <span>New Notes</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
