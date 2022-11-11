+++
title = "Shims for Userspace Code Over Old Kelvins"
manpower = "2 Engineers"
duration = "2 Months"
end_date = "2023-02-01"
contributors = ["~tinnus-napbus", "~dinleb-rambep"]
+++
The kernel should be able to run applications written at old Kelvin versions.  This is part of the general backward compatibility story, and it would also make it easier to release each new Kelvin version, since we wouldn't have to coordinate with userspace developers to get them to update their applications each time.

Technically, this requires some changes to Gall and Clay to recognize and build old code, and with each old Kelvin we want to support a new shim will need to be written.
