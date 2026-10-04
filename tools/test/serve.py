"""Tiny static server for tests: serves the repo root on a free port."""
import functools, http.server, socketserver, threading
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass

def serve():
    h = functools.partial(Quiet, directory=str(ROOT))
    srv = socketserver.ThreadingTCPServer(('127.0.0.1', 0), h)
    srv.daemon_threads = True
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv, f'http://127.0.0.1:{srv.server_address[1]}/'
