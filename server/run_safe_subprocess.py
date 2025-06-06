import subprocess
import sys
import tempfile
import os


def run_client_code(code: str):

    # Create a temporary file to store the client's code
    with tempfile.NamedTemporaryFile(suffix=".py", delete=False) as temp_file:
        temp_filename = temp_file.name
        temp_file.write(code.encode("utf-8"))

    try:

        # Use sys.executable to ensure the same Python interpreter is used (for pandas and scipy this is necessary)
        result = subprocess.run(
            [sys.executable, temp_filename, "safe_env.py"],
            capture_output=True,
            text=True,
            check=False,
            timeout=5,
            env={},
        )

        # Return stdout and stderr
        return {
            "success": result.returncode == 0,
            "stdout": result.stdout,
            "stderr": result.stderr,
        }
    finally:
        # Clean up the temporary file
        os.unlink(temp_filename)
