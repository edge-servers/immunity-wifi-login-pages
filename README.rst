immunity-sphinx-theme
=====================

A `Sphinx theme`_ for Immunity docs, based on the `Read The Docs`_
default theme (sphinx_rtd_theme_).

**Live demo:** https://immunity-sphinx-theme.readthedocs.io/en/latest/

.. figure:: https://user-images.githubusercontent.com/56113566/221259494-d7f5ecb9-8ed2-4187-a3dc-8ae51ed1d324.png
  :align: center

Installation
------------

This theme is distributed on PyPI as immunity-sphinx-theme_ and can be
installed with ``pip``:

.. code:: console

    $ python3 -m pip install immunity-sphinx-theme

To use the theme in your Sphinx project, you will need to
add the following to your ``conf.py`` file:

.. code:: python

    # add this extension
    extensions = [...,
    'immunity.sphinx.theme',
    ...
    ]
    html_theme = "immunity-sphinx-theme"

Development
-----------

.. code:: bash

    python3 -m pip install -e .
    make clean # Not always needed, but better to be cautious
    make html
    open build/html/index.html

Need help?
----------

- If any help regarding installing and using `sphinx` and
  `reStructured Text` is required then please visit this
  `link <http://www.sphinx-doc.org/en/stable/tutorial.html>`_.

- Feel free to post any doubt or comment through our `support channels
  <http://immunity.org/support.html>`_.

.. _Sphinx theme: https://www.sphinx-doc.org/en/master/development/theming.html
.. _Read The Docs: https://readthedocs.org
.. _sphinx_rtd_theme: https://github.com/readthedocs/sphinx_rtd_theme
.. _immunity-sphinx-theme: https://pypi.org/project/immunity-sphinx-theme/
.. _configuration options: https://sphinx-rtd-theme.readthedocs.io/en/latest/configuring.html
