# import re

# def parse_config(text):
#     hostname = ""
#     interfaces = []
#     routing = []

#     # NEW
#     vlans = []

#     current_interface = None

#     # NEW
#     current_vlan = None

#     for line in text.splitlines():
#         line = line.strip()

#         # Hostname
#         if line.startswith("hostname"):
#             hostname = line.split()[1]

#         # Interface
#         elif line.startswith("interface"):

#             if current_interface is not None:
#                 interfaces.append(current_interface)

#             current_interface = {
#                 "name": line.split()[1],
#                 "status": "up"
#             }

#         # Interface IP
#         elif line.startswith("ip address") and current_interface is not None:
#             parts = line.split()
#             current_interface["ip"] = parts[2]
#             current_interface["mask"] = parts[3]

#         # Shutdown
#         elif line == "shutdown" and current_interface is not None:
#             current_interface["status"] = "down"

#         # ---------------- VLAN ----------------

#         elif line.startswith("vlan"):

#             # Save previous VLAN
#             if current_vlan is not None:
#                 vlans.append(current_vlan)

#             # Create new VLAN
#             current_vlan = {
#                 "id": line.split()[1]
#             }

#         elif line.startswith("name") and current_vlan is not None:
#             current_vlan["name"] = line.split()[1]

#         # -------------- Routing --------------

#         elif re.match(r"router\s+\w+", line):
#             routing.append(line.split()[1])

#     # Save last interface
#     if current_interface is not None:
#         interfaces.append(current_interface)

#     # Save last VLAN
#     if current_vlan is not None:
#         vlans.append(current_vlan)

#     return {
#         "hostname": hostname,
#         "interfaces": interfaces,
#         "vlans": vlans,
#         "routing": routing
#     }
import re

def parse_config(text):
    hostname = ""

    interfaces = []
    vlans = []
    routing = []
    static_routes = []
    acls = []
    dhcp_pools = []
    dns_servers = []
    nat_rules = []
    users = []

    management = {
        "ssh": False,
        "telnet": False
    }

    current_interface = None
    current_vlan = None
    current_dhcp = None

    for line in text.splitlines():
        line = line.strip()

        if not line:
            continue

        # ---------------- Hostname ----------------

        if line.startswith("hostname"):
            hostname = line.split()[1]

        # ---------------- Interface ----------------

        elif line.startswith("interface"):

            if current_interface is not None:
                interfaces.append(current_interface)

            current_interface = {
                "name": line.split()[1],
                "status": "up"
            }

        elif line.startswith("ip address") and current_interface is not None:
            parts = line.split()
            current_interface["ip"] = parts[2]
            current_interface["mask"] = parts[3]

        elif line == "shutdown" and current_interface is not None:
            current_interface["status"] = "down"

        elif line.startswith("speed") and current_interface is not None:
            current_interface["speed"] = line.split()[1]

        elif line.startswith("duplex") and current_interface is not None:
            current_interface["duplex"] = line.split()[1]

        # ---------------- VLAN ----------------

        elif line.startswith("vlan"):

            if current_vlan is not None:
                vlans.append(current_vlan)

            current_vlan = {
                "id": line.split()[1]
            }

        elif line.startswith("name") and current_vlan is not None:
            current_vlan["name"] = line.split()[1]

        # ---------------- Routing Protocol ----------------

        elif re.match(r"router\s+\w+", line):
            routing.append(line.split()[1])

        # ---------------- Static Route ----------------

        elif line.startswith("ip route"):
            parts = line.split()

            static_routes.append({
                "destination": parts[2],
                "mask": parts[3],
                "next_hop": parts[4]
            })

        # ---------------- ACL ----------------

        elif line.startswith("access-list"):
            parts = line.split()

            acl = {
                "number": parts[1],
                "action": parts[2],
                "rule": " ".join(parts[3:])
            }

            acls.append(acl)

        # ---------------- DHCP ----------------

        elif line.startswith("ip dhcp pool"):

            if current_dhcp is not None:
                dhcp_pools.append(current_dhcp)

            current_dhcp = {
                "name": line.split()[3]
            }

        elif line.startswith("network") and current_dhcp is not None:
            parts = line.split()

            current_dhcp["network"] = parts[1]
            current_dhcp["mask"] = parts[2]

        elif line.startswith("default-router") and current_dhcp is not None:
            current_dhcp["gateway"] = line.split()[1]

        elif line.startswith("dns-server") and current_dhcp is not None:
            current_dhcp["dns"] = line.split()[1]

        # ---------------- DNS ----------------

        elif line.startswith("ip name-server"):
            dns_servers.extend(line.split()[2:])

        # ---------------- NAT ----------------

        elif line.startswith("ip nat"):
            nat_rules.append(line)

        # ---------------- Users ----------------

        elif line.startswith("username"):
            parts = line.split()

            users.append({
                "username": parts[1]
            })

        # ---------------- SSH / Telnet ----------------

        elif line.startswith("transport input"):

            if "ssh" in line:
                management["ssh"] = True

            if "telnet" in line:
                management["telnet"] = True

    # Save last objects

    if current_interface is not None:
        interfaces.append(current_interface)

    if current_vlan is not None:
        vlans.append(current_vlan)

    if current_dhcp is not None:
        dhcp_pools.append(current_dhcp)

    return {
        "hostname": hostname,
        "interfaces": interfaces,
        "vlans": vlans,
        "routing": routing,
        "static_routes": static_routes,
        "acls": acls,
        "dhcp_pools": dhcp_pools,
        "dns_servers": dns_servers,
        "nat_rules": nat_rules,
        "users": users,
        "management": management
    }