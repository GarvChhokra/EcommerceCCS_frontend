from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import requests
import time

options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])
driver = webdriver.Chrome(options=options)
driver.get("https://tympanus.net/codrops/css_reference/clip-path/")
# driver.get("http://localhost:3000/")
print(driver.title)
driver.maximize_window()


def checking_links_accessible():
    links = driver.find_elements(By.TAG_NAME, 'a')
    print(len(links))
    for link in links:
        # href = link.get_attribute('href')
        # response = requests.get(href)
        # if response.status_code >= 200 and response.status_code <= 299 and href is not None and not href.startswith('tel:'):
        # if (driver.find_element(By.XPATH, "//ul[@class='dropdown-menu dropdown-menu-right']")):
        #     continue
        # print(href, "True")
        print(link)
        link.click()
        time.sleep(1)
        driver.back()
        print("home")
        print("going to next")
        # else:
        #     print(href, "False")


checking_links_accessible()
