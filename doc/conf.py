import os
import sys

sys.path.append(os.path.abspath("./demo/"))
from immunity.sphinx.theme import __version__ as theme_version

project = 'Immunity Demo Documentation'
version = theme_version
author = 'Immunity'
extensions = [
    'sphinx.ext.autodoc',
    'immunity.sphinx.theme',
]

# Immunity demo docs site configuration
from datetime import date

project = 'Immunity'
copyright = f'2017-{date.today().year}, Immunity'
author = 'Immunity Community'
exclude_patterns = []
templates_path = ['templates']
html_theme = 'immunity-sphinx-theme'
html_logo = 'demo/assets/design/immunity-logo-black.svg'
html_favicon = 'demo/assets/design/favicon.png'
html_favicon = 'demo/assets/design/favicon.png'
