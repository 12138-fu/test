# -*- coding: utf-8 -*-
import os, sys, posixpath
import paramiko

HOST, PORT, USER, PASS = "192.168.11.12", 22, "root", "Axdata@2808"
REMOTE_ROOT = "/opt/pr"
FILES = [
    "index.html",
    "css/dpp.css",
    "js/app.js",
    "js/pages-part1.js",
    "js/pages-part2.js",
    "js/pages-part3.js",
    "js/pages-part4.js",
]

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, port=PORT, username=USER, password=PASS, timeout=15)
sftp = ssh.open_sftp()

def ensure_dir(path):
    parts = path.strip("/").split("/")
    cur = ""
    for p in parts:
        cur += "/" + p
        try:
            sftp.stat(cur)
        except IOError:
            sftp.mkdir(cur)

ensure_dir(REMOTE_ROOT)
for rel in FILES:
    local = os.path.join(root, rel.replace("/", os.sep))
    remote = posixpath.join(REMOTE_ROOT, rel)
    ensure_dir(posixpath.dirname(remote))
    sftp.put(local, remote)
    st = sftp.stat(remote)
    print("uploaded %-24s -> %s (%d bytes)" % (rel, remote, st.st_size))

# verify listing
for d in [REMOTE_ROOT, REMOTE_ROOT + "/css", REMOTE_ROOT + "/js"]:
    print(d + ":", sorted(sftp.listdir(d)))

sftp.close()
ssh.close()
print("DEPLOY OK")
