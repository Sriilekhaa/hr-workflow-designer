from playwright.sync_api import sync_playwright
import time

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})

        # Dashboard
        page.goto('http://localhost:4173/')
        time.sleep(1)
        page.screenshot(path='/home/jules/verification/dashboard.png', full_page=True)

        # Designer
        page.goto('http://localhost:4173/designer')
        time.sleep(1)
        page.screenshot(path='/home/jules/verification/designer.png', full_page=True)

        # Workflows
        page.goto('http://localhost:4173/workflows')
        time.sleep(1)
        page.screenshot(path='/home/jules/verification/workflows.png', full_page=True)

        # Advanced Canvas
        page.goto('http://localhost:4173/advanced-canvas')
        time.sleep(1)
        page.screenshot(path='/home/jules/verification/advanced-canvas.png', full_page=True)

        # Logs
        page.goto('http://localhost:4173/logs')
        time.sleep(1)
        page.screenshot(path='/home/jules/verification/logs.png', full_page=True)

        # Simulation
        page.goto('http://localhost:4173/simulation')
        time.sleep(1)
        page.screenshot(path='/home/jules/verification/simulation.png', full_page=True)

        # Templates
        page.goto('http://localhost:4173/templates')
        time.sleep(1)
        page.screenshot(path='/home/jules/verification/templates.png', full_page=True)

        browser.close()

if __name__ == "__main__":
    verify_frontend()
